import { logger } from '../utils/logger.js';

export interface AgentProcessResult {
  emailsProcessed: number;
  tasksExtracted: number;
  draftsGenerated: number;
  meetingsExtracted: number;
}

export class AgentService {
  private accessToken: string;
  private userId: string;

  constructor(accessToken: string, userId: string) {
    this.accessToken = accessToken;
    this.userId = userId;
  }

  async processAgent(): Promise<AgentProcessResult> {
    logger.info('AgentService: Processing agent');
    return {
      emailsProcessed: 0,
      tasksExtracted: 0,
      draftsGenerated: 0,
      meetingsExtracted: 0
    };
  }
}
