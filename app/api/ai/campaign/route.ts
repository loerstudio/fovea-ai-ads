import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ClaudeMCPManager } from '@/lib/claude-mcp';
import { db } from '@/lib/db';
import { campaigns, ads, metrics, optimizations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    const claudeMCP = new ClaudeMCPManager(process.env.ANTHROPIC_API_KEY!);

    switch (action) {
      case 'generate-creative': {
        // Use Claude + Higgsfield MCP to generate creative
        const creative = await claudeMCP.generateCreative({
          productName: data.productName,
          targetAudience: data.targetAudience,
          objective: data.objective,
          style: data.style || 'modern, professional, high-converting',
          platform: data.platform || 'meta'
        });

        // Save to database
        const [newAd] = await db.insert(ads).values({
          adSetId: data.adSetId,
          name: data.creativeName,
          type: 'image',
          headline: creative.headline,
          primaryText: creative.primaryText,
          description: creative.description,
          ctaText: creative.ctaText,
          creativeUrl: creative.imageUrl,
          destinationUrl: data.destinationUrl,
          aiGenerated: true,
          generationPrompt: JSON.stringify(data),
          status: 'draft'
        }).returning();

        return NextResponse.json({
          success: true,
          creative: newAd,
          aiResponse: creative
        });
      }

      case 'create-campaign': {
        // Use Claude + Meta Ads MCP to create campaign
        const campaignResult = await claudeMCP.createMetaCampaign({
          campaignName: data.name,
          objective: data.objective,
          budget: data.budget,
          targeting: data.targeting,
          creative: data.creative
        });

        // Save campaign to database
        const [newCampaign] = await db.insert(campaigns).values({
          userId: userId,
          platform: 'meta',
          externalId: campaignResult.campaignId,
          name: data.name,
          status: 'active',
          objective: data.objective,
          budget: data.budget.toString(),
          budgetType: 'daily',
          aiOptimized: true,
          startDate: new Date().toISOString()
        }).returning();

        return NextResponse.json({
          success: true,
          campaign: newCampaign,
          metaResponse: campaignResult
        });
      }

      case 'optimize-campaign': {
        // Get current campaign metrics
        const campaignMetrics = await db
          .select()
          .from(metrics)
          .where(eq(metrics.campaignId, data.campaignId))
          .limit(30);

        // Use Claude to analyze and optimize
        const optimization = await claudeMCP.optimizeCampaign(
          data.campaignId,
          campaignMetrics
        );

        // Save optimization to database
        const [newOptimization] = await db.insert(optimizations).values({
          campaignId: data.campaignId,
          type: 'ai_optimization',
          description: optimization.description,
          previousValue: optimization.previousState,
          newValue: optimization.newState,
          impact: optimization.projectedImpact,
          status: 'applied',
          appliedAt: new Date()
        }).returning();

        return NextResponse.json({
          success: true,
          optimization: newOptimization,
          aiResponse: optimization
        });
      }

      case 'generate-strategy': {
        // Generate complete campaign strategy
        const strategy = await claudeMCP.generateCampaignStrategy({
          niche: data.niche,
          product: data.product,
          monthlyBudget: data.monthlyBudget,
          targetROI: data.targetROI || 200
        });

        return NextResponse.json({
          success: true,
          strategy: strategy
        });
      }

      case 'analyze-roi': {
        // Get all user campaigns
        const userCampaigns = await db
          .select()
          .from(campaigns)
          .where(eq(campaigns.userId, userId));

        // Get metrics for each campaign
        const campaignsWithMetrics = await Promise.all(
          userCampaigns.map(async (campaign) => {
            const campaignMetrics = await db
              .select()
              .from(metrics)
              .where(eq(metrics.campaignId, campaign.id))
              .limit(30);

            return {
              ...campaign,
              metrics: campaignMetrics
            };
          })
        );

        // Analyze ROI with Claude
        const roiAnalysis = await claudeMCP.analyzeROI(campaignsWithMetrics);

        return NextResponse.json({
          success: true,
          analysis: roiAnalysis
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Campaign API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}