import { BaseTool } from '../base-tool.js';
import { IntelligenceSynthesisService } from '../../../services/intelligence-synthesis.service.js';
import { copilotAgentsService } from '../../../services/agents/copilot-agents.service.js';
import { logger } from '../../../utils/logger.js';

export class GetDailyBriefingTool extends BaseTool {
  name = 'get_daily_briefing';
  description = 'Get daily Copilot extensibility intelligence briefing with urgent actions and opportunities';
  inputSchema = {
    type: 'object' as const,
    properties: {}
  };

  async execute(params: any) {
    try {
      logger.info('Getting daily intelligence briefing');

      const synthService = new IntelligenceSynthesisService(this.prisma);
      const briefing = await synthService.generateDailyBriefing(
        this.userContext.getUserId()
      );

      return {
        success: true,
        briefing
      };
    } catch (error) {
      this.handleError(error, 'Failed to get daily briefing');
    }
  }
}

export class AddOpportunityTool extends BaseTool {
  name = 'add_extension_opportunity';
  description = 'Add a new Copilot extension opportunity (company/partner)';
  inputSchema = {
    type: 'object' as const,
    properties: {
      companyName: {
        type: 'string',
        description: 'Company name'
      },
      industry: {
        type: 'string',
        description: 'Industry (healthcare, legal, finance, energy, etc.)'
      },
      domainExpertise: {
        type: 'string',
        description: 'What domain expertise they have'
      },
      extensionIdea: {
        type: 'string',
        description: 'What Copilot extension they could build'
      },
      discoverySource: {
        type: 'string',
        description: 'How you discovered this (linkedin, research_agent, kyc_agent, teams_meeting)'
      },
      notes: {
        type: 'string',
        description: 'Additional notes'
      }
    },
    required: ['companyName', 'industry', 'extensionIdea']
  };

  async execute(params: any) {
    try {
      const { companyName, industry, domainExpertise, extensionIdea, discoverySource, notes } = params;

      logger.info(`Adding extension opportunity: ${companyName}`);

      const opportunity = await this.prisma.extensionOpportunity.create({
        data: {
          userId: this.userContext.getUserId(),
          companyName,
          industry,
          domainExpertise: domainExpertise || '',
          extensionIdea,
          discoverySource: discoverySource || 'manual',
          microsoftRelationship: 'unknown',
          notes,
          targetMarket: `${industry} companies using ${companyName}'s solutions`
        }
      });

      return {
        success: true,
        opportunity: {
          id: opportunity.id,
          companyName: opportunity.companyName,
          industry: opportunity.industry,
          extensionIdea: opportunity.extensionIdea,
          score: opportunity.opportunityScore
        }
      };
    } catch (error) {
      this.handleError(error, 'Failed to add opportunity');
    }
  }
}

export class AddInsightTool extends BaseTool {
  name = 'add_insight';
  description = 'Add intelligence insight from Research Agent, KYC Agent, LinkedIn, or Teams meeting';
  inputSchema = {
    type: 'object' as const,
    properties: {
      source: {
        type: 'string',
        enum: ['research_agent', 'kyc_agent', 'linkedin', 'teams_meeting', 'manual'],
        description: 'Source of the insight'
      },
      insightType: {
        type: 'string',
        enum: ['market_trend', 'customer_feedback', 'competitive_intel', 'pain_point', 'opportunity_signal'],
        description: 'Type of insight'
      },
      title: {
        type: 'string',
        description: 'Brief title for the insight'
      },
      content: {
        type: 'string',
        description: 'Full insight content'
      },
      industry: {
        type: 'string',
        description: 'Related industry (if applicable)'
      },
      companyName: {
        type: 'string',
        description: 'Related company (if applicable)'
      }
    },
    required: ['source', 'insightType', 'title', 'content']
  };

  async execute(params: any) {
    try {
      const { source, insightType, title, content, industry, companyName } = params;

      logger.info(`Adding insight from ${source}: ${title}`);

      let opportunityId = null;
      if (companyName) {
        const opportunity = await this.prisma.extensionOpportunity.findFirst({
          where: {
            userId: this.userContext.getUserId(),
            companyName: {
              contains: companyName,
              // mode: 'insensitive' // SQLite doesn't support case-insensitive mode
            }
          }
        });
        opportunityId = opportunity?.id;
      }

      const insight = await this.prisma.insight.create({
        data: {
          opportunityId,
          source,
          insightType,
          title,
          content,
          industry,
          relevance: 'medium'
        }
      });

      return {
        success: true,
        insight: {
          id: insight.id,
          title: insight.title,
          source: insight.source,
          linkedToOpportunity: !!opportunityId
        }
      };
    } catch (error) {
      this.handleError(error, 'Failed to add insight');
    }
  }
}

export class GetAgentQueriesTool extends BaseTool {
  name = 'get_agent_queries';
  description = 'Get suggested queries for Research Agent and KYC Agent, plus links to access them';
  inputSchema = {
    type: 'object' as const,
    properties: {
      industry: {
        type: 'string',
        description: 'Industry to research (healthcare, legal, finance, energy, etc.)'
      },
      focusArea: {
        type: 'string',
        description: 'What to focus on (trends, pain_points, opportunities, customers)'
      }
    },
    required: ['industry']
  };

  async execute(params: any) {
    try {
      const { industry, focusArea = 'opportunities' } = params;

      logger.info(`Generating agent queries for ${industry}`);

      const researchQuery = copilotAgentsService.generateResearchQuery(industry, focusArea);
      const kycQuery = copilotAgentsService.generateKYCQuery(industry);

      return {
        success: true,
        researchAgent: {
          link: copilotAgentsService.getResearchAgentLink(),
          suggestedQuery: researchQuery,
          instructions: 'Open the link, paste the query, copy the response back'
        },
        kycAgent: {
          link: copilotAgentsService.getKYCAgentLink(),
          suggestedQuery: kycQuery,
          instructions: 'Open the link, paste the query, copy the response back'
        }
      };
    } catch (error) {
      this.handleError(error, 'Failed to generate agent queries');
    }
  }
}

export class SynthesizeIntelligenceTool extends BaseTool {
  name = 'synthesize_intelligence';
  description = 'Synthesize intelligence from Research Agent, KYC Agent, and LinkedIn for an industry';
  inputSchema = {
    type: 'object' as const,
    properties: {
      industry: {
        type: 'string',
        description: 'Industry to analyze'
      },
      researchData: {
        type: 'string',
        description: 'Response from Research Agent (paste it here)'
      },
      kycData: {
        type: 'string',
        description: 'Response from KYC Agent (paste it here)'
      },
      linkedInData: {
        type: 'string',
        description: 'LinkedIn findings (paste your observations)'
      }
    },
    required: ['industry']
  };

  async execute(params: any) {
    try {
      const { industry, researchData, kycData, linkedInData } = params;

      logger.info(`Synthesizing intelligence for ${industry}`);

      const synthService = new IntelligenceSynthesisService(this.prisma);
      const analysis = await synthService.synthesizeIndustryIntelligence(
        industry,
        researchData,
        kycData,
        linkedInData
      );

      return {
        success: true,
        industry,
        analysis
      };
    } catch (error) {
      this.handleError(error, 'Failed to synthesize intelligence');
    }
  }
}

