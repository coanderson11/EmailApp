import { getPrisma } from '../config/database.js';
import { UserContext } from '../mcp/user-context.js';
import { OutlookService } from './outlook.service.js';
import { DraftService } from './draft.service.js';
import { MeetingService } from './meeting.service.js';
import { AgentService } from './agent.service.js';
import { tokenRefreshService } from './token-refresh.service.js';

export interface Services {
  outlook: OutlookService;
  draft: DraftService;
  meeting: MeetingService;
  agent: AgentService;
  tokenRefresh: typeof tokenRefreshService;
  prisma: ReturnType<typeof getPrisma>;
}

export async function initializeServices(userContext: UserContext): Promise<Services> {
  const prisma = getPrisma();

  const accessToken = await userContext.getAccessToken();
  const userId = userContext.getUserId();

  const outlook = new OutlookService(accessToken);
  const draft = new DraftService(accessToken, userId, prisma);
  const meeting = new MeetingService(accessToken, userId, prisma);
  const agent = new AgentService(accessToken, userId);

  return {
    outlook,
    draft,
    meeting,
    agent,
    tokenRefresh: tokenRefreshService,
    prisma,
  };
}

export { OutlookService } from './outlook.service.js';
export { DraftService } from './draft.service.js';
export { MeetingService } from './meeting.service.js';
export { AgentService } from './agent.service.js';
export { tokenRefreshService } from './token-refresh.service.js';
