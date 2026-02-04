import { PrismaClient } from '@prisma/client';
import { ClaudeService } from './claude.service.js';
import { logger } from '../utils/logger.js';

export interface IntelligenceBriefing {
  date: Date;
  urgentActions: UrgentAction[];
  opportunities: OpportunitySummary[];
  insights: InsightSummary;
  nextSteps: string[];
}

export interface UrgentAction {
  type: string;
  company: string;
  trigger: string;
  why: string;
  action: string;
  draft?: string;
}

export interface OpportunitySummary {
  company: string;
  score: number;
  stage: string;
  extensionIdea: string;
  nextAction: string;
}

export interface InsightSummary {
  fromResearch: string[];
  fromKYC: string[];
  fromLinkedIn: string[];
  fromTeams: string[];
  synthesis: string;
}

export class IntelligenceSynthesisService {
  private prisma: PrismaClient;
  private claudeService: ClaudeService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.claudeService = new ClaudeService();
  }

  async generateDailyBriefing(userId: string): Promise<IntelligenceBriefing> {
    logger.info('Generating daily intelligence briefing');

    const recentActivities = await this.prisma.activity.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { date: 'desc' },
      take: 50
    });

    const opportunities = await this.prisma.extensionOpportunity.findMany({
      where: {
        userId,
        status: 'active'
      },
      include: {
        contacts: true,
        insights: {
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        }
      },
      orderBy: { opportunityScore: 'desc' }
    });

    const insights = await this.prisma.insight.findMany({
      where: {
        date: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { date: 'desc' },
      take: 20
    });

    return {
      date: new Date(),
      urgentActions: [],
      opportunities: opportunities.map(opp => ({
        company: opp.companyName,
        score: opp.opportunityScore,
        stage: opp.stage,
        extensionIdea: opp.extensionIdea,
        nextAction: opp.nextAction || 'Review and reach out'
      })),
      insights: {
        fromResearch: insights.filter(i => i.source === 'research_agent').map(i => i.content),
        fromKYC: insights.filter(i => i.source === 'kyc_agent').map(i => i.content),
        fromLinkedIn: insights.filter(i => i.source === 'linkedin').map(i => i.content),
        fromTeams: insights.filter(i => i.source === 'teams_meeting').map(i => i.content),
        synthesis: 'Intelligence synthesis ready'
      },
      nextSteps: []
    };
  }

  async synthesizeIndustryIntelligence(
    industry: string,
    researchData?: string,
    kycData?: string,
    linkedInData?: string
  ): Promise<{
    topOpportunities: string[];
    keyInsights: string[];
    recommendedActions: string[];
  }> {
    logger.info(`Synthesizing intelligence for ${industry}`);

    const prompt = `You are analyzing Copilot extensibility opportunities in the ${industry} industry.

${researchData ? `RESEARCH AGENT DATA:\n${researchData}\n\n` : ''}
${kycData ? `KNOW YOUR CUSTOMER DATA:\n${kycData}\n\n` : ''}
${linkedInData ? `LINKEDIN SIGNALS:\n${linkedInData}\n\n` : ''}

Based on this intelligence, identify:
1. Top 3 companies that would be great Copilot extension partners
2. Key insights about the market opportunity
3. Recommended next actions

Focus on companies with:
- Domain expertise in ${industry}
- Proprietary data or algorithms
- Existing Microsoft relationship
- Technical capability to build extensions

Provide actionable recommendations.`;

    const result = await this.claudeService.analyzeEmail('', prompt);

    return {
      topOpportunities: ['Opportunity analysis in progress'],
      keyInsights: [result.analysis],
      recommendedActions: result.suggestions
    };
  }
}
