import { BaseTool } from './base-tool.js';
import { DraftService } from '../../services/draft.service.js';
import { OutlookService } from '../../services/outlook.service.js';
import { logger } from '../../utils/logger.js';

export class GenerateDraftTool extends BaseTool {
  name = 'generate_draft';
  description = 'Generate a draft email response';
  inputSchema = {
    type: 'object' as const,
    properties: {
      emailId: {
        type: 'string',
        description: 'ID of the email to respond to'
      },
      instructions: {
        type: 'string',
        description: 'Instructions for generating the draft'
      },
      tone: {
        type: 'string',
        enum: ['professional', 'casual', 'friendly', 'formal'],
        description: 'Tone of the response'
      }
    },
    required: ['emailId']
  };

  async execute(params: any) {
    try {
      const { emailId, instructions, tone = 'professional' } = params;
      logger.info(`Generating draft for email: ${emailId}`);

      const email = await this.prisma.email.findUnique({
        where: { id: emailId }
      });

      if (!email) {
        throw new Error(`Email not found: ${emailId}`);
      }

      const accessToken = await this.userContext.getAccessToken();
      const userId = this.userContext.getUserId();
      const draftService = new DraftService(accessToken, userId, this.prisma);
      const draft = await draftService.generateDraft(email, instructions, tone);

      return {
        success: true,
        draft: {
          id: draft.id,
          subject: draft.subject,
          body: draft.body,
          recipientTo: draft.recipientTo,
          status: draft.status
        }
      };
    } catch (error) {
      this.handleError(error, 'Failed to generate draft');
    }
  }
}

export class ListDraftsTool extends BaseTool {
  name = 'list_drafts';
  description = 'List all draft emails';
  inputSchema = {
    type: 'object' as const,
    properties: {
      status: {
        type: 'string',
        enum: ['draft', 'sent'],
        description: 'Filter by status'
      },
      limit: {
        type: 'number',
        description: 'Maximum number of drafts to return',
        default: 20
      }
    }
  };

  async execute(params: any) {
    try {
      const { status, limit = 20 } = params;
      logger.info(`Listing drafts: status=${status}, limit=${limit}`);

      const where: any = {
        userId: this.userContext.getUserId()
      };

      if (status) where.status = status;

      const drafts = await this.prisma.draft.findMany({
        where,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });

      return {
        count: drafts.length,
        drafts: drafts.map(d => ({
          id: d.id,
          subject: d.subject,
          body: d.body,
          toRecipients: d.toRecipients,
          status: d.status,
          createdAt: d.createdAt
        }))
      };
    } catch (error) {
      this.handleError(error, 'Failed to list drafts');
    }
  }
}

export class UpdateDraftTool extends BaseTool {
  name = 'update_draft';
  description = 'Update a draft email';
  inputSchema = {
    type: 'object' as const,
    properties: {
      draftId: {
        type: 'string',
        description: 'ID of the draft to update'
      },
      subject: {
        type: 'string',
        description: 'New subject line'
      },
      body: {
        type: 'string',
        description: 'New body content'
      }
    },
    required: ['draftId']
  };

  async execute(params: any) {
    try {
      const { draftId, subject, body } = params;
      logger.info(`Updating draft: ${draftId}`);

      const updateData: any = {};
      if (subject) updateData.subject = subject;
      if (body) updateData.body = body;

      const draft = await this.prisma.draft.update({
        where: { id: draftId },
        data: updateData
      });

      return {
        success: true,
        draft: {
          id: draft.id,
          subject: draft.subject,
          body: draft.body
        }
      };
    } catch (error) {
      this.handleError(error, 'Failed to update draft');
    }
  }
}

export class SendDraftTool extends BaseTool {
  name = 'send_draft';
  description = 'Send a draft email';
  inputSchema = {
    type: 'object' as const,
    properties: {
      draftId: {
        type: 'string',
        description: 'ID of the draft to send'
      }
    },
    required: ['draftId']
  };

  async execute(params: any) {
    try {
      const { draftId } = params;
      logger.info(`Sending draft: ${draftId}`);

      const draft = await this.prisma.draft.findUnique({
        where: { id: draftId }
      });

      if (!draft) {
        throw new Error(`Draft not found: ${draftId}`);
      }

      // TODO: Implement actual email sending via Outlook
      const accessToken = await this.userContext.getAccessToken();
      const outlookService = new OutlookService(accessToken);
      // await outlookService.sendEmail(draft);

      await this.prisma.draft.update({
        where: { id: draftId },
        data: {
          status: 'sent',
          sentAt: new Date()
        }
      });

      return {
        success: true,
        message: 'Draft sent successfully',
        draftId
      };
    } catch (error) {
      this.handleError(error, 'Failed to send draft');
    }
  }
}
