import Anthropic from '@anthropic-ai/sdk';
import * as fal from "@fal-ai/client";

// Production AI Manager - No MCP, solo API dirette
export class AIManager {
  private claude: Anthropic;

  constructor() {
    this.claude = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Configure Fal.ai
    fal.config({
      credentials: process.env.FAL_KEY!
    });
  }

  // Genera copy persuasivo con Claude
  async generateAdCopy(params: {
    product: string;
    targetAudience: string;
    objective: string;
    platform: 'meta' | 'google' | 'tiktok';
  }) {
    const prompt = `Sei un esperto copywriter per coach. Crea copy per ads.

Prodotto: ${params.product}
Target: ${params.targetAudience}
Obiettivo: ${params.objective}
Piattaforma: ${params.platform}

Genera:
1. Headline (max 40 caratteri) - Hook potente
2. Primary Text - Usa framework PAS o AIDA
3. Description - Benefit chiaro
4. CTA - Azione specifica

NO menzioni di AI, Claude, o tool. Solo copy che converte.
Rispondi in JSON.`;

    const response = await this.claude.messages.create({
      model: 'claude-3-haiku-20240307', // Più economico per copy
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return JSON.parse(response.content[0].text);
  }

  // Genera immagine con Fal.ai (Flux o SDXL)
  async generateCreative(params: {
    concept: string;
    style: string;
    platform: string;
  }) {
    // Genera prompt ottimizzato con Claude
    const promptResponse = await this.claude.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Create an image generation prompt for a coaching ad:
Concept: ${params.concept}
Style: ${params.style}
Platform: ${params.platform}

Output only the prompt, no explanations. Make it photorealistic and high-converting.`
      }]
    });

    const imagePrompt = promptResponse.content[0].text;

    // Genera immagine con Fal.ai Flux
    const result = await fal.run("fal-ai/flux/schnell", {
      input: {
        prompt: imagePrompt,
        image_size: params.platform === 'meta' ? 'square' : 'landscape_16_9',
        num_images: 1,
        enable_safety_checker: true
      }
    }) as any;

    return {
      imageUrl: result.images[0].url,
      prompt: imagePrompt
    };
  }

  // Analizza metriche e suggerisci ottimizzazioni
  async analyzeAndOptimize(metrics: any) {
    const prompt = `Analizza queste metriche ads e suggerisci ottimizzazioni:

${JSON.stringify(metrics, null, 2)}

Fornisci:
1. Analisi ROI attuale
2. 3 ottimizzazioni specifiche
3. Budget reallocation suggerito
4. Previsione ROI dopo ottimizzazioni

Rispondi in JSON con azioni concrete.`;

    const response = await this.claude.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return JSON.parse(response.content[0].text);
  }

  // Genera strategia campagna completa
  async generateCampaignStrategy(businessInfo: {
    niche: string;
    product: string;
    monthlyBudget: number;
    targetROI: number;
  }) {
    const prompt = `Crea strategia campagne per coach.

Business:
- Nicchia: ${businessInfo.niche}
- Prodotto: ${businessInfo.product}
- Budget mensile: €${businessInfo.monthlyBudget}
- Target ROI: ${businessInfo.targetROI}%

Genera strategia con:
1. Split budget per piattaforma (%)
2. Targeting dettagliato per audience
3. Struttura campagne (TOF/MOF/BOF)
4. KPI e metriche da tracciare
5. Piano ottimizzazione 30-60-90 giorni

Output JSON strutturato.`;

    const response = await this.claude.messages.create({
      model: 'claude-3-sonnet-20241022', // Migliore per strategie complesse
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return JSON.parse(response.content[0].text);
  }
}

// COSTI API (Novembre 2024):
// Claude Haiku: $0.25 / 1M input tokens, $1.25 / 1M output
// Claude Sonnet: $3 / 1M input tokens, $15 / 1M output
// Fal.ai Flux Schnell: ~$0.003 per immagine
// Meta Marketing API: Gratis
// Google Ads API: Gratis

// PRICING STRATEGY:
// Per ogni campagna creata:
// - 3-5 chiamate Claude Haiku (~$0.01)
// - 1 chiamata Claude Sonnet (~$0.02)
// - 3 immagini Fal.ai (~$0.01)
// COSTO TOTALE: ~$0.04 per campagna

// PREZZO CLIENTE:
// Starter €297/mese = ~100 campagne/mese = margine 99.9%
// Pro €697/mese = illimitate = margine 99.9%