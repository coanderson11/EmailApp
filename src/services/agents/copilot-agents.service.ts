import { logger } from '../../utils/logger.js';

export interface ResearchAgentQuery {
  topic: string;
  industry?: string;
  focusArea?: string;
}

export interface ResearchAgentResponse {
  insights: Array<{
    title: string;
    content: string;
    source: string;
    relevance: string;
  }>;
  trends: string[];
  painPoints: string[];
  summary: string;
}

export interface KYCAgentQuery {
  topic: string;
  industry?: string;
  customerSegment?: string;
}

export interface KYCAgentResponse {
  customerInsights: Array<{
    insight: string;
    customerCount: number;
    examples: string[];
  }>;
  requests: Array<{
    request: string;
    frequency: number;
    urgency: string;
  }>;
  summary: string;
}

export class CopilotAgentsService {
  private researchAgentUrl = 'https://m365.cloud.microsoft/chat/?titleId=P_552e6eda-fc18-7fb9-0ef6-1bf2de3393e4';
  private kycAgentUrl = 'https://m365.cloud.microsoft/chat/?titleId=T_72c4a880-72ec-599a-b2c0-8eaf1be5c21e';

  async parseResearchAgentResponse(rawResponse: string): Promise<ResearchAgentResponse> {
    logger.info('Parsing Research Agent response');
    return {
      insights: [],
      trends: [],
      painPoints: [],
      summary: rawResponse
    };
  }

  async parseKYCAgentResponse(rawResponse: string): Promise<KYCAgentResponse> {
    logger.info('Parsing KYC Agent response');
    return {
      customerInsights: [],
      requests: [],
      summary: rawResponse
    };
  }

  generateResearchQuery(industry: string, focusArea: string): string {
    return `Analyze the ${industry} industry focusing on ${focusArea}. 
    
Key questions:
- What are the top 3 pain points companies in ${industry} face with AI/data?
- What trends are driving AI adoption in this industry?
- What are companies spending money on related to AI/data?
- What regulatory or compliance factors matter for AI in ${industry}?

Format as: Trends, Pain Points, Market Drivers, Key Players`;
  }

  generateKYCQuery(industry: string): string {
    return `Show me insights about ${industry} customers:

- How many ${industry} customers do we have using M365/Copilot?
- What have ${industry} customers requested related to AI or Copilot capabilities?
- What pain points have ${industry} customers mentioned?
- What industry-specific features have they asked for?
- Success stories or case studies in ${industry}?`;
  }

  getResearchAgentLink(): string {
    return this.researchAgentUrl;
  }

  getKYCAgentLink(): string {
    return this.kycAgentUrl;
  }
}

export const copilotAgentsService = new CopilotAgentsService();

