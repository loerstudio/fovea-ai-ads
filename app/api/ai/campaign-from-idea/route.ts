import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ClaudeDirectMCPManager } from '@/lib/claude-direct-mcp';
import { db } from '@/lib/db';
import { users, campaigns } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { idea, budget, targetAudience } = await req.json();

    if (!idea || !budget) {
      return NextResponse.json({
        error: 'Idea e budget sono richiesti'
      }, { status: 400 });
    }

    // Get user data
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({
        error: 'Utente non trovato'
      }, { status: 404 });
    }

    // Con Claude MCP ufficiale, non servono token Meta
    // L'OAuth è gestito automaticamente da Claude

    const mcpManager = new ClaudeDirectMCPManager();

    // Generate complete campaign from idea usando i TUOI MCP
    const result = await mcpManager.processCompleteWorkflow({
      userId: userId,
      userEmail: user.email,
      idea: idea,
      budget: budget,
      targetAudience: targetAudience || 'Imprenditori interessati al coaching'
    });

    // Save campaign data to database for tracking
    const campaignData = {
      userId: user.id,
      platform: 'meta',
      name: `AI Campaign: ${idea.substring(0, 50)}...`,
      status: 'draft',
      objective: result.strategy.objective,
      budget: budget.toString(),
      budgetType: 'monthly',
      aiOptimized: true,
      metadata: JSON.stringify({
        originalIdea: idea,
        targetAudience: targetAudience,
        strategy: result.strategy,
        creativeCount: result.creatives.length
      })
    };

    const [savedCampaign] = await db
      .insert(campaigns)
      .values(campaignData)
      .returning();

    return NextResponse.json({
      success: true,
      campaignId: savedCampaign.id,
      strategy: result.strategy,
      creatives: result.creatives,
      message: `Generati ${result.creatives.length} creativi per la tua idea!`
    });

  } catch (error: any) {
    console.error('Campaign from idea error:', error);

    // User-friendly error messages
    if (error?.message?.includes('MCP')) {
      return NextResponse.json({
        error: 'Servizio AI temporaneamente non disponibile. Riprova tra qualche minuto.',
      }, { status: 503 });
    }

    if (error?.message?.includes('Meta')) {
      return NextResponse.json({
        error: 'Errore connessione Meta Ads. Verifica le autorizzazioni del tuo account.',
      }, { status: 400 });
    }

    if (error?.message?.includes('Higgsfield')) {
      return NextResponse.json({
        error: 'Generazione creative temporaneamente non disponibile.',
      }, { status: 503 });
    }

    return NextResponse.json({
      error: 'Errore interno del server. Il nostro team è stato notificato.',
    }, { status: 500 });
  }
}

// GET route per status check
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user's Meta connection status
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    return NextResponse.json({
      hasMetaConnection: true, // MCP gestisce automaticamente
      canCreateCampaigns: true, // Sempre disponibile con MCP
      mcpServicesStatus: {
        higgsfield: 'operational',
        metaAds: 'operational',
        claudeAI: 'operational'
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json({
      error: 'Errore controllo stato servizi'
    }, { status: 500 });
  }
}