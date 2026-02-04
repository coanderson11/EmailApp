# Test Environment Setup

This guide will help you set up the Email MCP server for testing with mock data (no real email connections).

## Quick Setup

1. **Run the setup script:**
   ```bash
   setup-test-environment.bat
   ```

   This will:
   - Generate Prisma client
   - Set up the database
   - Seed mock test data
   - Build the project

## Manual Setup (if needed)

If you prefer to run commands manually:

```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Run migrations to create database schema
npx prisma migrate deploy

# 3. Seed test data
npx tsx seed-test-data.ts

# 4. Build the project
npm run build
```

## Test Data

The seed script creates:

- **1 Test User**
  - Email: `test@example.com`
  - Microsoft ID: `test-microsoft-id-12345`
  - Mock OAuth tokens (not real)

- **5 Sample Emails** covering various scenarios:
  - Meeting requests
  - Project updates
  - Action items
  - Customer feedback

- **3 Tasks** with different priorities
- **2 Meetings** with agendas
- **1 Draft** email response
- **1 Extension Opportunity** with contact information

## Configure Claude Desktop

Add this to your Claude Desktop configuration file:

**Config File Location:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "email-task-agent": {
      "command": "node",
      "args": [
        "c:/Users/coander/myprojects/EmailApp/dist/mcp-server.js"
      ],
      "env": {
        "DATABASE_URL": "file:c:/Users/coander/myprojects/EmailApp/dev.db",
        "ANTHROPIC_API_KEY": "your-anthropic-api-key-here",
        "MICROSOFT_CLIENT_ID": "test-client-id",
        "MICROSOFT_CLIENT_SECRET": "test-client-secret",
        "BACKEND_URL": "http://localhost:8025",
        "LOG_FILE": "c:/Users/coander/myprojects/EmailApp/mcp.log",
        "ENABLE_SCHEDULER": "false"
      }
    }
  }
}
```

**Important:** Replace `your-anthropic-api-key-here` with your actual Anthropic API key if you want to test AI features, or leave it as a placeholder for structure testing.

## Start Testing

1. **Save the Claude Desktop config** (see above)
2. **Restart Claude Desktop** completely
3. **Check MCP connection**:
   - Look for the MCP icon/indicator in Claude Desktop
   - Check that "email-task-agent" is listed and connected

4. **Test the tools** by asking Claude:
   ```
   Can you fetch my emails using the MCP tools?
   ```

## Available MCP Tools

Currently enabled for testing:
- `fetch_emails` - Fetches emails from the database

Other tools are commented out in `src/mcp-server.ts` but can be enabled:
- Task management tools
- Draft creation tools
- Meeting extraction tools
- Intelligence synthesis tools

## Viewing Logs

Logs are written to: `c:/Users/coander/myprojects/EmailApp/mcp.log`

You can tail the log file to see real-time activity:
```bash
Get-Content mcp.log -Wait -Tail 50
```

## Testing Without Real Email

The mock setup means:
- ✅ MCP server will start successfully
- ✅ Tools will be registered and callable
- ✅ Database queries will work with test data
- ❌ No real emails will be fetched (uses database mock data)
- ❌ Microsoft Graph API calls will fail (but can be mocked if needed)

## Troubleshooting

### Server won't start
- Check `mcp.log` for errors
- Verify database path in config is correct
- Ensure `dev.db` file exists after running migrations

### No tools available
- Check that server is connected in Claude Desktop
- Restart Claude Desktop
- Check logs for initialization errors

### Database errors
- Run `npx prisma generate` again
- Check that migrations completed successfully
- Verify DATABASE_URL in .env points to correct location

## Next Steps

Once testing with mock data works, you can:
1. Connect to real Microsoft OAuth for actual email access
2. Enable additional tools by uncommenting them in `src/mcp-server.ts`
3. Add more test data with additional seed scripts
4. Create integration tests for the MCP tools
