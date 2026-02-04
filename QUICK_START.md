# 🚀 Quick Start: Generate Demo Voiceovers

**Goal**: Generate professional voiceovers for the EmailApp demo video in 15 minutes.

---

## ✅ Checklist (Complete in Order)

### [ ] Step 1: Install Node.js (5 minutes)

**Why**: Required to run the voiceover generation script.

**Download**: https://nodejs.org/en/download/

**Recommended**: LTS version (20.x or later)

**Installation**:
1. Download Windows installer (.msi)
2. Run installer
3. Accept defaults (includes npm)
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**Expected Output**:
```
v20.x.x
10.x.x
```

---

### [ ] Step 2: Install Azure TTS SDK (1 minute)

```powershell
cd C:\Users\coander\myprojects\EmailApp\scripts
npm install
```

**What this installs**:
- `microsoft-cognitiveservices-speech-sdk` - Official Azure SDK

**Expected Output**:
```
added 1 package in 3s
```

---

### [ ] Step 3: Create Azure Speech Services Account (5 minutes)

**Free Tier**: 500,000 characters/month (plenty for this demo)

#### 3.1 Sign in to Azure
- Go to: https://portal.azure.com
- Sign in with Microsoft account (or create free account)

#### 3.2 Create Speech Services Resource
1. Click **"Create a resource"** (top left)
2. Search for **"Speech Services"**
3. Click **"Create"**

#### 3.3 Configure
```
Subscription:     [Your subscription]
Resource Group:   [Create new] → "emailapp-demo"
Region:           East US (or closest to you)
Name:             emailapp-tts-demo
Pricing Tier:     Free F0
```

4. Click **"Review + create"**
5. Click **"Create"**
6. Wait 30 seconds for deployment

#### 3.4 Get Credentials
1. Click **"Go to resource"**
2. In left menu, click **"Keys and Endpoint"**
3. Copy:
   - **KEY 1** (looks like: `abc123def456...`)
   - **REGION** (e.g., `eastus`)

---

### [ ] Step 4: Configure Credentials (1 minute)

**IMPORTANT**: Never commit credentials to git!

```powershell
# Open PowerShell in scripts directory
cd C:\Users\coander\myprojects\EmailApp\scripts

# Set environment variables (this session only)
$env:AZURE_SPEECH_KEY = "paste_your_KEY_1_here"
$env:AZURE_SPEECH_REGION = "eastus"

# Verify they're set
echo $env:AZURE_SPEECH_KEY
echo $env:AZURE_SPEECH_REGION
```

**Alternative**: Create `.env` file (more permanent)
```bash
# Copy example file
copy .env.example .env

# Edit .env in notepad
notepad .env

# Add your credentials:
AZURE_SPEECH_KEY=your_key_here
AZURE_SPEECH_REGION=eastus
```

---

### [ ] Step 5: Generate Voiceovers (3 minutes)

```powershell
cd C:\Users\coander\myprojects\EmailApp\scripts
node generate-voiceover.js
```

**What happens**:
- Connects to Azure TTS API
- Generates 16 MP3 files (one per scene)
- Saves to `./voiceovers/` directory
- Takes ~2-3 minutes to complete

**Expected Output**:
```
========================================
EmailApp Demo Voiceover Generator
========================================

Voice: en-US-JennyNeural
Region: eastus
Output Format: audio-24khz-48kbitrate-mono-mp3

Generating 16 scenes...

Generating: scene_1_Title_Card.mp3...
✓ Generated: scene_1_Title_Card.mp3
Generating: scene_2_The_Problem.mp3...
✓ Generated: scene_2_The_Problem.mp3
...
[continues for all 16 scenes]

========================================
✓ Voiceover generation complete!
========================================

Output directory: C:\Users\coander\myprojects\EmailApp\scripts\voiceovers
Total scenes: 16
```

---

## 🎨 Optional: Try Different Voices

```powershell
# List all available voices
node generate-voiceover.js --list-voices

# Generate with male voice
node generate-voiceover.js --voice en-US-GuyNeural

# Generate with different speaking rate
node generate-voiceover.js --rate 1.0
```

**Recommended Voices**:
- `en-US-JennyNeural` - Professional female (default)
- `en-US-GuyNeural` - Professional male
- `en-US-AriaNeural` - Warm, friendly female
- `en-US-DavisNeural` - Deep, executive male

---

## 📂 Output Files

After completion, you'll have:

```
scripts/voiceovers/
├── scene_1_Title_Card.mp3                    (8 sec)
├── scene_2_The_Problem.mp3                   (22 sec)
├── scene_3_The_Solution_Introduction.mp3     (20 sec)
├── scene_4A_Fetch_Emails.mp3                 (20 sec)
├── scene_4B_Extract_Tasks.mp3                (40 sec)
├── scene_4C_Task_Dashboard.mp3               (40 sec)
├── scene_5A_Extract_Meeting_Info.mp3         (30 sec)
├── scene_5B_Generate_Meeting_Prep.mp3        (60 sec)
├── scene_6A_Generate_Draft.mp3               (40 sec)
├── scene_6B_Refine_Draft.mp3                 (30 sec)
├── scene_6C_Draft_Management.mp3             (20 sec)
├── scene_7A_Agent_Settings.mp3               (30 sec)
├── scene_7B_Run_Agent_Now.mp3                (30 sec)
├── scene_8_Value_Proposition_&_ROI.mp3       (60 sec)
├── scene_9_Call_to_Action.mp3                (30 sec)
└── scene_10_End_Card.mp3                     (10 sec)
```

**Total**: 16 files, ~5-8 MB total size

---

## 🎬 Next Steps After Generation

1. **Listen to each file** - Verify quality and timing
2. **Import to video editor** - DaVinci Resolve, Premiere, Camtasia
3. **Record screen footage** - Follow VIDEO_SCRIPT.md for each scene
4. **Sync audio with video** - Match voiceover timing to visuals
5. **Add background music** - Keep at -20dB to -25dB
6. **Export final video** - 1080p, AAC audio, 192kbps

---

## ❓ Troubleshooting

### "AZURE_SPEECH_KEY environment variable not set"
**Fix**: Re-run environment variable commands in PowerShell (they reset when you close terminal)

### "Invalid subscription key or region"
**Fix**:
1. Verify key from Azure Portal (no spaces, full key)
2. Check region matches exactly (e.g., "eastus" not "East US")

### "npm: command not found"
**Fix**: Install Node.js first (Step 1)

### "Module not found: microsoft-cognitiveservices-speech-sdk"
**Fix**: Run `npm install` in scripts directory

---

## 💰 Cost Estimate

**Free Tier**: 500,000 characters/month

**This Demo**:
- 16 scenes
- ~5,000 characters total
- **Cost: $0** (Free tier covers it)

**Paid Tier** (if needed):
- $16 per 1 million characters
- This demo = ~$0.08 on paid tier

---

## 🔒 Security Reminders

✅ Never commit `.env` file to git (already in .gitignore)
✅ Don't share your AZURE_SPEECH_KEY publicly
✅ Rotate keys every 90 days in production
✅ Use Azure Key Vault for production deployments

---

## 📞 Support

- **Azure Issues**: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/
- **Script Issues**: Check VOICEOVER_SETUP.md for detailed troubleshooting
- **Voice Options**: https://speech.microsoft.com/portal/voicegallery

---

**Ready?** Start with Step 1 above! ⬆️

---

*Estimated Total Time: 15 minutes*
*Cost: $0 (free tier)*
*Output: 16 professional voiceover files*
