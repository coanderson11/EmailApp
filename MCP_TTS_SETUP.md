# Generate Voiceovers Using MCP Servers

**Use Claude Desktop with MCP TTS servers to generate voiceovers automatically**

---

## 🎯 Recommended Setup: ElevenLabs MCP Server

### Step 1: Get ElevenLabs API Key (5 min)

1. Go to: https://elevenlabs.io
2. Sign up for free account
3. Navigate to Profile → API Keys
4. Copy your API key
5. **Free tier**: 10,000 characters/month (enough for this demo!)

### Step 2: Configure Claude Desktop (2 min)

**Location of config file:**
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Edit the file:**
```json
{
  "mcpServers": {
    "elevenlabs": {
      "command": "npx",
      "args": ["-y", "@elevenlabs/mcp-server"],
      "env": {
        "ELEVENLABS_API_KEY": "your_elevenlabs_api_key_here"
      }
    }
  }
}
```

**Save and restart Claude Desktop**

### Step 3: Generate Voiceovers via Claude (10 min)

Once configured, you can ask me (Claude) to generate voiceovers directly!

**Example conversation:**

**You:** "Generate a voiceover for Scene 1 with this text: 'EmailApp: AI-powered email and task management for Microsoft Outlook.' Use a professional female voice and save as scene_1_Title_Card.mp3"

**Claude:** *[Calls ElevenLabs MCP tool to generate audio file]*

**Repeat for all 16 scenes!**

---

## 🔧 Alternative: Multi-Engine MCP Setup

For maximum flexibility, use the multi-engine TTS server:

### Configuration:

```json
{
  "mcpServers": {
    "tts": {
      "command": "npx",
      "args": ["-y", "@blacktop/mcp-tts"],
      "env": {
        "ELEVENLABS_API_KEY": "sk_...",
        "OPENAI_API_KEY": "sk-...",
        "GOOGLE_API_KEY": "..."
      }
    }
  }
}
```

**Benefits:**
- Switch between providers
- Fallback options if one service is down
- Compare quality across providers

---

## 📊 MCP vs Manual Comparison

| Method | Quality | Speed | Cost | Automation |
|--------|---------|-------|------|------------|
| **Azure Speech Studio (Manual)** | ⭐⭐⭐⭐ | 20 min | $0 | ❌ Manual |
| **ElevenLabs MCP** | ⭐⭐⭐⭐⭐ | 5 min | $0 (free tier) | ✅ Automated |
| **OpenAI TTS MCP** | ⭐⭐⭐⭐ | 5 min | ~$0.08 | ✅ Automated |
| **Piper TTS MCP** | ⭐⭐⭐ | 3 min | $0 | ✅ Automated |

---

## 🎙️ Workflow with MCP

### Automated Generation:

Once MCP is configured, you can ask Claude:

```
"Generate all 16 voiceovers for my demo using the texts in SCENE_TEXTS.txt.
Use ElevenLabs with a professional female voice.
Save files to C:\Users\coander\myprojects\EmailApp\voiceovers\
with the filenames specified."
```

**Claude will:**
1. Read SCENE_TEXTS.txt
2. Call ElevenLabs MCP tool 16 times
3. Generate each MP3 file
4. Save with correct filenames
5. **Total time: ~5 minutes** (automated!)

---

## 🔒 Security Best Practices

### API Key Storage:
- ✅ Store in `claude_desktop_config.json` (not committed to git)
- ✅ Use environment variables in production
- ✅ Rotate keys every 90 days
- ❌ Never commit API keys to repositories

### Free Tier Limits:
- **ElevenLabs**: 10,000 chars/month
- **OpenAI**: Pay-as-you-go (~$15/1M chars)
- **Piper**: Unlimited (local)

**This demo**: ~5,000 characters total (well within free tiers)

---

## 🚀 Quick Start (5 Minutes Total)

### If you have Claude Desktop installed:

1. **Get API key** (ElevenLabs or OpenAI) - 2 min
2. **Edit config file** - 1 min
3. **Restart Claude Desktop** - 1 min
4. **Ask Claude to generate voiceovers** - 1 min

### Example Request:

```
"I need to generate 16 voiceover files. Here are the texts from SCENE_TEXTS.txt.
Please use ElevenLabs to generate each scene with:
- Voice: Professional female (Rachel or Bella)
- Format: MP3
- Output directory: C:\Users\coander\myprojects\EmailApp\voiceovers\
- Filenames as specified in SCENE_TEXTS.txt

Generate all 16 scenes now."
```

---

## 💡 Advantages of MCP Approach

✅ **Automation** - Generate all 16 files in one command
✅ **Consistency** - Same voice settings across all scenes
✅ **Speed** - 5 minutes vs 20 minutes manual
✅ **Flexibility** - Easy to regenerate if you want changes
✅ **Integration** - Works directly in your Claude workflow

---

## 🔗 Resources

- [Official ElevenLabs MCP](https://github.com/elevenlabs/elevenlabs-mcp)
- [Multi-Engine TTS MCP](https://github.com/blacktop/mcp-tts)
- [OpenAI TTS MCP](https://mcpservers.org/servers/nakamurau1/tts-mcp)
- [Piper TTS MCP](https://lobehub.com/mcp/cryptodappdev-piper-tts-mcp)
- [MCP Servers Directory](https://mcpservers.org)

---

## ❓ Troubleshooting

### "MCP server not found"
- Ensure you restarted Claude Desktop after config change
- Verify `npx` is available (comes with Node.js)
- Check config file JSON syntax is valid

### "API key invalid"
- Verify key is correct (no spaces, full key)
- Check key has proper permissions
- Ensure account is active and within quota

### "Tool not available"
- Confirm MCP server is running (check Claude Desktop logs)
- Try restarting Claude Desktop
- Check network connectivity for API calls

---

**Ready to automate your voiceover generation?** Let me know which MCP server you want to use!
