import { BaseTool } from './base-tool.js';
import { OutlookService } from '../../services/outlook.service.js';
import { logger } from '../../utils/logger.js';

export class FetchEmailsTool extends BaseTool {
  name = 'fetch_emails';
  description = 'Fetch recent emails from Outlook inbox';
  inputSchema = {
    type: 'object' as const,
    properties: {
      maxResults: {
        type: 'number',
        description: 'Maximum number of emails to fetch (default: 10)',
        default: 10
      },
      unreadOnly: {
        type: 'boolean',
        description: 'Only fetch unread emails',
        default: false
      }
    }
  };

  async execute(params: any) {
    try {
      const { maxResults = 10, unreadOnly = false } = params;
      logger.info(`Fetching emails: max=${maxResults}, unreadOnly=${unreadOnly}`);

      const accessToken = await this.userContext.getAccessToken();
      const outlookService = new OutlookService(accessToken);

      const emails = await outlookService.fetchEmails(maxResults);

      const filteredEmails = unreadOnly 
        ? emails.filter((e: any) => !e.processed) 
        : emails;

      for (const email of filteredEmails) {
        await this.prisma.email.upsert({
          where: { outlookId: email.id },
          update: {
            subject: email.subject,
            from: email.from,
            body: email.body,
            receivedAt: email.receivedAt
          },
          create: {
            outlookId: email.id,
            userId: this.userContext.getUserId(),
            subject: email.subject,
            from: email.from,
            body: email.body,
            receivedAt: email.receivedAt,
            processed: false
          }
        });
      }

      logger.info(`Fetched ${filteredEmails.length} emails`);

      return {
        count: filteredEmails.length,
        emails: filteredEmails.map((e: any) => ({
          id: (e as any).outlookId,
          subject: e.subject,
          from: e.from,
          receivedAt: e.receivedAt,
          preview: e.body.substring(0, 150)
        }))
      };
    } catch (error) {
      this.handleError(error, 'Failed to fetch emails');
    }
  }
}
