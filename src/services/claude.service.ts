import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../utils/logger.js';

export interface ClaudeAnalysisResult {
  analysis: string;
  suggestions: string[];
  confidence: number;
}

export interface ExtractedTask {
  id: string;
  title: string;
  description: string;
  priority: string;
  category?: string;
  dueDate?: Date;
}

export class ClaudeService {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY
    });
  }

  async analyzeEmail(emailContent: string, prompt: string): Promise<ClaudeAnalysisResult> {
    logger.info('ClaudeService: Analyzing email with Claude');
    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `${prompt}\n\nEmail content:\n${emailContent}`
        }]
      });
      const analysis = message.content[0].type === 'text' ? message.content[0].text : 'No text response';
      return { analysis, suggestions: [], confidence: 0.8 };
    } catch (error: any) {
      logger.error('ClaudeService: Error analyzing email', error);
      throw new Error(`Claude API error: ${error.message}`);
    }
  }

  async extractTasks(email: any): Promise<ExtractedTask[]> {
    logger.info('ClaudeService: Extracting tasks from email');
    
    // TODO: Implement actual task extraction using Claude
    // For now, return empty array as stub
    
    return [];
  }
}
