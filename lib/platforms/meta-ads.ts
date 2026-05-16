// Meta Marketing API Direct Integration
// Docs: https://developers.facebook.com/docs/marketing-apis

export class MetaAdsManager {
  private accessToken: string;
  private apiVersion = 'v18.0';
  private baseUrl = 'https://graph.facebook.com';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Create Campaign
  async createCampaign(adAccountId: string, data: {
    name: string;
    objective: string;
    budget: number;
    status: string;
  }) {
    const url = `${this.baseUrl}/${this.apiVersion}/act_${adAccountId}/campaigns`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        name: data.name,
        objective: data.objective.toUpperCase(),
        status: data.status,
        special_ad_categories: ['NONE']
      })
    });

    return response.json();
  }

  // Create Ad Set
  async createAdSet(campaignId: string, data: {
    name: string;
    dailyBudget: number;
    targeting: any;
    optimization_goal: string;
  }) {
    const url = `${this.baseUrl}/${this.apiVersion}/act_${campaignId}/adsets`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        name: data.name,
        daily_budget: data.dailyBudget * 100, // In cents
        campaign_id: campaignId,
        billing_event: 'IMPRESSIONS',
        optimization_goal: data.optimization_goal,
        targeting: data.targeting,
        status: 'ACTIVE'
      })
    });

    return response.json();
  }

  // Create Ad Creative
  async createCreative(adAccountId: string, data: {
    name: string;
    imageUrl: string;
    message: string;
    headline: string;
    description: string;
    linkUrl: string;
    callToAction: string;
  }) {
    const url = `${this.baseUrl}/${this.apiVersion}/act_${adAccountId}/adcreatives`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        name: data.name,
        object_story_spec: {
          page_id: process.env.META_PAGE_ID,
          link_data: {
            image_hash: await this.uploadImage(data.imageUrl),
            link: data.linkUrl,
            message: data.message,
            name: data.headline,
            description: data.description,
            call_to_action: {
              type: data.callToAction,
              value: { link: data.linkUrl }
            }
          }
        }
      })
    });

    return response.json();
  }

  // Upload Image
  private async uploadImage(imageUrl: string) {
    const url = `${this.baseUrl}/${this.apiVersion}/act_${process.env.META_AD_ACCOUNT_ID}/adimages`;

    const formData = new FormData();
    formData.append('access_token', this.accessToken);
    formData.append('url', imageUrl);

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    return result.images?.[imageUrl]?.hash;
  }

  // Get Campaign Insights
  async getCampaignInsights(campaignId: string, dateRange: string = 'last_7d') {
    const url = `${this.baseUrl}/${this.apiVersion}/${campaignId}/insights`;

    const params = new URLSearchParams({
      access_token: this.accessToken,
      date_preset: dateRange,
      fields: 'impressions,clicks,spend,conversions,conversion_values,ctr,cpc,cpm,roas'
    });

    const response = await fetch(`${url}?${params}`);
    return response.json();
  }

  // Pause/Resume Campaign
  async updateCampaignStatus(campaignId: string, status: 'ACTIVE' | 'PAUSED') {
    const url = `${this.baseUrl}/${this.apiVersion}/${campaignId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        status: status
      })
    });

    return response.json();
  }

  // Update Budget
  async updateBudget(adSetId: string, newDailyBudget: number) {
    const url = `${this.baseUrl}/${this.apiVersion}/${adSetId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.accessToken,
        daily_budget: newDailyBudget * 100 // In cents
      })
    });

    return response.json();
  }
}