import { pgTable, serial, text, varchar, timestamp, boolean, integer, decimal, json, uuid, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (synced with Clerk)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  companyName: varchar('company_name', { length: 255 }),
  niche: varchar('niche', { length: 255 }), // coaching niche
  websiteUrl: varchar('website_url', { length: 255 }),

  // Meta Ads Integration (gestito da Claude MCP)
  // Non servono token - Claude MCP ufficiale gestisce OAuth automaticamente

  subscription: varchar('subscription', { length: 50 }).default('trial'), // trial, pro, enterprise
  guaranteeEligible: boolean('guarantee_eligible').default(true),
  guaranteeStartDate: date('guarantee_start_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Ad Accounts table
export const adAccounts = pgTable('ad_accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  platform: varchar('platform', { length: 50 }).notNull(), // meta, google, tiktok
  accountId: varchar('account_id', { length: 255 }).notNull(),
  accountName: varchar('account_name', { length: 255 }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  isActive: boolean('is_active').default(true),
  lastSynced: timestamp('last_synced'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Campaigns table
export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  adAccountId: uuid('ad_account_id').references(() => adAccounts.id),
  platform: varchar('platform', { length: 50 }).notNull(),
  externalId: varchar('external_id', { length: 255 }), // Platform campaign ID
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('draft'), // draft, active, paused, completed
  objective: varchar('objective', { length: 100 }), // conversions, traffic, awareness
  budget: decimal('budget', { precision: 10, scale: 2 }),
  budgetType: varchar('budget_type', { length: 50 }), // daily, lifetime
  startDate: date('start_date'),
  endDate: date('end_date'),
  aiOptimized: boolean('ai_optimized').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Ad Sets/Ad Groups table
export const adSets = pgTable('ad_sets', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  externalId: varchar('external_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  targetingCriteria: json('targeting_criteria'), // audience targeting data
  bid: decimal('bid', { precision: 10, scale: 2 }),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Ads/Creatives table
export const ads = pgTable('ads', {
  id: uuid('id').defaultRandom().primaryKey(),
  adSetId: uuid('ad_set_id').references(() => adSets.id),
  externalId: varchar('external_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }), // image, video, carousel
  headline: text('headline'),
  primaryText: text('primary_text'),
  description: text('description'),
  ctaText: varchar('cta_text', { length: 100 }),
  creativeUrl: text('creative_url'), // Image/video URL
  destinationUrl: text('destination_url'),
  aiGenerated: boolean('ai_generated').default(false),
  generationPrompt: text('generation_prompt'),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Performance Metrics table
export const metrics = pgTable('metrics', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  adSetId: uuid('ad_set_id').references(() => adSets.id),
  adId: uuid('ad_id').references(() => ads.id),
  date: date('date').notNull(),
  impressions: integer('impressions').default(0),
  clicks: integer('clicks').default(0),
  conversions: integer('conversions').default(0),
  spend: decimal('spend', { precision: 10, scale: 2 }).default('0'),
  revenue: decimal('revenue', { precision: 10, scale: 2 }).default('0'),
  ctr: decimal('ctr', { precision: 5, scale: 2 }), // Click-through rate
  cpc: decimal('cpc', { precision: 10, scale: 2 }), // Cost per click
  cpa: decimal('cpa', { precision: 10, scale: 2 }), // Cost per acquisition
  roas: decimal('roas', { precision: 10, scale: 2 }), // Return on ad spend
  roi: decimal('roi', { precision: 10, scale: 2 }), // Return on investment
  createdAt: timestamp('created_at').defaultNow(),
});

// AI Optimizations Log
export const optimizations = pgTable('optimizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  type: varchar('type', { length: 100 }), // budget_adjustment, targeting_update, creative_refresh
  description: text('description'),
  previousValue: json('previous_value'),
  newValue: json('new_value'),
  impact: decimal('impact', { precision: 10, scale: 2 }), // Projected or actual impact
  status: varchar('status', { length: 50 }).default('pending'), // pending, applied, rejected
  appliedAt: timestamp('applied_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ROI Guarantee Tracking
export const roiGuarantee = pgTable('roi_guarantee', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  totalSpend: decimal('total_spend', { precision: 12, scale: 2 }).default('0'),
  totalRevenue: decimal('total_revenue', { precision: 12, scale: 2 }).default('0'),
  roi: decimal('roi', { precision: 10, scale: 2 }).default('0'),
  status: varchar('status', { length: 50 }).default('active'), // active, positive, negative, refunded
  refundAmount: decimal('refund_amount', { precision: 10, scale: 2 }),
  refundProcessedAt: timestamp('refund_processed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Billing/Subscriptions
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  plan: varchar('plan', { length: 50 }).notNull(), // starter, pro, enterprise
  status: varchar('status', { length: 50 }).notNull(), // active, cancelled, past_due
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  adAccounts: many(adAccounts),
  campaigns: many(campaigns),
  subscriptions: many(subscriptions),
  roiGuarantees: many(roiGuarantee),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  adAccount: one(adAccounts, {
    fields: [campaigns.adAccountId],
    references: [adAccounts.id],
  }),
  adSets: many(adSets),
  metrics: many(metrics),
  optimizations: many(optimizations),
}));

export const adSetsRelations = relations(adSets, ({ one, many }) => ({
  campaign: one(campaigns, {
    fields: [adSets.campaignId],
    references: [campaigns.id],
  }),
  ads: many(ads),
  metrics: many(metrics),
}));

export const adsRelations = relations(ads, ({ one, many }) => ({
  adSet: one(adSets, {
    fields: [ads.adSetId],
    references: [adSets.id],
  }),
  metrics: many(metrics),
}));