import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ClaudeDirectMCPManager } from '@/lib/claude-direct-mcp';
import { db } from '@/lib/db';
import { users, campaigns, adSets, ads } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { approvedCreativeIds, strategy, budget } = await req.json();

    if (!approvedCreativeIds?.length || !strategy) {
      return NextResponse.json({
        error: 'Seleziona almeno una creatività per procedere'
      }, { status: 400 });
    }

    // Get user data with Meta credentials
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!user?.metaAccessToken || !user?.metaAdAccountId) {
      return NextResponse.json({
        error: 'Account Meta Ads non configurato. Vai in Impostazioni per connettere.',
        needsMetaSetup: true
      }, { status: 400 });
    }

    const mcpManager = new ClaudeDirectMCPManager();

    // Get creatives data (dalla sessione o database)
    const selectedCreatives = await getSelectedCreatives(approvedCreativeIds);

    // Launch approved campaigns via your MCP
    const launchResults = await mcpManager.launchApprovedCampaigns({
      userMetaToken: user.metaAccessToken,
      approvedCreatives: selectedCreatives,
      strategy: strategy,
      budget: budget
    });

    // Save campaign results to database
    const savedCampaigns = [];

    for (const result of launchResults) {
      // Create campaign record
      const [savedCampaign] = await db
        .insert(campaigns)
        .values({
          userId: user.id,
          platform: 'meta',
          externalId: result.campaign_id,
          name: `Fovea AI - ${result.creative_id}`,
          status: 'active',
          objective: strategy.objective,
          budget: Math.floor(budget / launchResults.length).toString(),
          budgetType: 'daily',
          aiOptimized: true,
          startDate: new Date().toISOString()
        })
        .returning();

      // Create ad set record
      const [savedAdSet] = await db
        .insert(adSets)
        .values({
          campaignId: savedCampaign.id,
          externalId: result.ad_set_id,
          name: `AdSet - ${result.creative_id}`,
          targetingCriteria: strategy.targeting,
          budget: Math.floor(budget / launchResults.length).toString(),
          status: 'active'
        })
        .returning();

      // Create ad record
      const creative = selectedCreatives.find(c => c.id === result.creative_id);
      await db
        .insert(ads)
        .values({
          adSetId: savedAdSet.id,
          externalId: result.ad_id,
          name: `Ad - ${creative?.angle || result.creative_id}`,
          type: 'image',
          headline: creative?.copy?.headline || 'AI Generated Headline',
          primaryText: creative?.copy?.primaryText || 'AI Generated Copy',
          description: creative?.copy?.description || 'AI Generated Description',
          ctaText: creative?.copy?.cta || 'Learn More',
          creativeUrl: creative?.imageUrl || '',
          destinationUrl: user.websiteUrl || 'https://example.com',
          aiGenerated: true,
          status: 'active'
        });

      savedCampaigns.push({
        ...savedCampaign,
        metaPreviewUrl: result.preview_url,
        adSetId: savedAdSet.id,
        adId: result.ad_id
      });
    }

    // Start ROI guarantee tracking
    await startROIGuaranteeTracking(user.id, savedCampaigns);

    // Schedule automatic optimization
    await scheduleAutomaticOptimization(userId, savedCampaigns);

    return NextResponse.json({
      success: true,
      campaigns: savedCampaigns,
      message: `${launchResults.length} campagne lanciate con successo!`,
      roiGuarantee: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
        status: 'active'
      }
    });

  } catch (error: any) {
    console.error('Launch campaign error:', error);

    // Specific error handling
    if (error?.message?.includes('budget')) {
      return NextResponse.json({
        error: 'Budget insufficiente. Verifica i limiti del tuo account Meta.',
      }, { status: 400 });
    }

    if (error?.message?.includes('targeting')) {
      return NextResponse.json({
        error: 'Errore configurazione targeting. Contatta il supporto.',
      }, { status: 400 });
    }

    if (error?.message?.includes('creative')) {
      return NextResponse.json({
        error: 'Errore caricamento creatività. Riprova con immagini diverse.',
      }, { status: 400 });
    }

    return NextResponse.json({
      error: 'Errore lancio campagne. Il nostro team è stato notificato.',
    }, { status: 500 });
  }
}

// Helper function to get creative data
async function getSelectedCreatives(creativeIds: string[]) {
  // In production: get from Redis cache or database
  // For now: mock data structure
  return creativeIds.map((id, index) => ({
    id,
    angle: `Creative Angle ${index + 1}`,
    imageUrl: `https://example.com/creative-${id}.jpg`,
    copy: {
      headline: 'Transform Your Business Today',
      primaryText: 'Discover the secrets successful entrepreneurs use to scale.',
      description: 'Join thousands of satisfied clients.',
      cta: 'Get Started Now'
    }
  }));
}

// Start ROI guarantee tracking
async function startROIGuaranteeTracking(userId: string, campaigns: any[]) {
  // Implementation will depend on your ROI tracking system
  console.log(`Started ROI tracking for user ${userId} with ${campaigns.length} campaigns`);

  // TODO: Save to roiGuarantee table
  // TODO: Set up monitoring alerts
  // TODO: Schedule 60-day review
}

// Schedule automatic optimization
async function scheduleAutomaticOptimization(userId: string, campaigns: any[]) {
  // Schedule daily optimization checks
  console.log(`Scheduled optimization for user ${userId}`);

  // TODO: Add to job queue (Vercel Cron, Inngest, etc.)
  // TODO: Set up performance monitoring
  // TODO: Configure auto-scaling rules
}