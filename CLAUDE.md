# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for email task management with Microsoft Outlook integration. It exposes tools that allow Claude to interact with emails, tasks, meetings, and drafts through the Model Context Protocol.

## Core Technologies

- **Runtime**: Node.js with TypeScript (ES2020 modules)
- **Database**: SQLite with Prisma ORM
- **APIs**: Microsoft Graph API (Outlook), Anthropic Claude API
- **Protocol**: Model Context Protocol (MCP) SDK

## Build and Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Run the MCP server (production)
npm run start:mcp

# Development mode with hot reload
npm run dev

# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations
npx prisma migrate deploy

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## Configuration

### Environment Variables (.env)

Required variables:
- `DATABASE_URL`: SQLite database path (use absolute paths for MCP mode)
- `MICROSOFT_CLIENT_ID`: Azure AD OAuth client ID
- `MICROSOFT_CLIENT_SECRET`: Azure AD OAuth client secret
- `ANTHROPIC_API_KEY`: Anthropic API key for Claude integration
- `BACKEND_URL`: Backend URL for re-authentication (default: http://localhost:8025)
- `LOG_FILE`: Path to log file (default: ./mcp.log)
- `ENABLE_SCHEDULER`: Enable/disable automatic scheduling (default: false)

### MCP Configuration

The server is designed to be integrated with Claude Desktop or other MCP clients. See `MCP_CONFIG_EXAMPLE.json` for Claude Desktop configuration.

## Architecture

### High-Level Structure

```
src/
├── mcp/                      # MCP-specific code
│   ├── tools/               # MCP tool implementations
│   │   ├── base-tool.ts    # Abstract base class for all tools
│   │   ├── email-tools.ts  # Email fetching and processing
│   │   ├── task-tools.ts   # Task management
│   │   ├── draft-tools.ts  # Draft creation and management
│   │   ├── meeting-tools.ts # Meeting extraction
│   │   └── extensibility/   # Intelligence and extensibility features
│   └── user-context.ts      # User authentication context
├── services/                # Business logic layer
│   ├── outlook.service.ts   # Microsoft Graph API integration
│   ├── claude.service.ts    # Claude API integration
│   ├── agent.service.ts     # Agent orchestration
│   ├── draft.service.ts     # Draft management
│   ├── meeting.service.ts   # Meeting processing
│   ├── context.service.ts   # Context building for meetings
│   └── agents/              # Specialized agent services
├── config/                  # Configuration management
│   ├── database.ts          # Prisma initialization
│   └── mcp-config.ts        # MCP configuration loader
└── utils/                   # Utility functions
```

### MCP Tool Pattern

All tools extend `BaseTool` and implement:
- `name`: Tool identifier
- `description`: Tool description for LLM
- `inputSchema`: JSON schema for tool parameters
- `execute(params)`: Tool execution logic

Tools receive `UserContext` (for MS Graph authentication) and `PrismaClient` (for database access) in their constructor.

### Database Schema

Key models:
- **User**: Microsoft OAuth credentials and relationships
- **Email**: Stored emails from Outlook
- **Task**: Extracted or created tasks
- **Draft**: Email drafts pending approval
- **Meeting**: Extracted meeting information
- **MeetingPrep**: AI-generated meeting preparation documents
- **AgentSettings**: User preferences for agent behavior
- **ExtensionOpportunity**: Copilot extensibility tracking (business intelligence)
- **Activity**: Activity tracking for opportunities
- **Insight**: Industry insights and intelligence

### Authentication Flow

1. User authenticates via Microsoft OAuth (handled externally)
2. Tokens stored in database (User model)
3. `UserContext` loads single user on server start
4. Services use `UserContext` to access Microsoft Graph API
5. Token refresh handled by `token-refresh.service.ts`

## Key Patterns

### Adding a New MCP Tool

1. Create tool class in `src/mcp/tools/` extending `BaseTool`
2. Implement required properties: `name`, `description`, `inputSchema`
3. Implement `execute(params)` method
4. Register tool in `src/mcp-server.ts` in the `initializeTools()` method
5. Use `this.userContext` for MS Graph API access
6. Use `this.prisma` for database operations

### Service Layer

Services contain business logic and should be used by tools:
- Keep tools thin - delegate to services
- Services handle API calls, data processing, and complex logic
- Services are stateless and receive dependencies via constructor or method parameters

### Error Handling

- Tools catch errors and return structured error responses
- Use `BaseTool.handleError()` for consistent error formatting
- Server-level error handling for uncaught exceptions and signals

## Development Notes

### Database Workflow

When modifying the schema:
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create migration
3. Run `npx prisma generate` to update Prisma client
4. Restart server to use new schema

### Testing the MCP Server

The server communicates via stdio (standard input/output) following the MCP protocol. It's designed to be launched by MCP clients like Claude Desktop, not run directly for testing.

For debugging:
- Check `mcp.log` for server logs
- Use `npm run dev` for watch mode during development
- Logs include tool calls, execution results, and errors

### Microsoft Graph API

Common operations via `outlook.service.ts`:
- `fetchEmails()`: Retrieve emails from Outlook
- `sendEmail()`: Send email via Graph API
- `createDraft()`: Create draft in Outlook
- Token refresh is automatic via `token-refresh.service.ts`

### Working with Prisma

Always use the Prisma client from `config/database.ts`:
```typescript
import { getPrisma } from '../config/database.js';
const prisma = getPrisma();
```

Remember:
- Include `.js` extensions in imports (ES modules)
- Use async/await for all Prisma operations
- Handle Prisma errors gracefully
- Close connections on shutdown (handled in `mcp-server.ts`)

## Important Considerations

- Absolute paths required for `DATABASE_URL` in MCP mode
- All imports must use `.js` extensions (TypeScript + ES modules)
- Server runs in stdio mode for MCP protocol
- Single-user mode: loads one user from database on startup
- Token refresh happens automatically when tokens expire
