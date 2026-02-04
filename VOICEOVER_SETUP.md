# Voiceover Generation Setup Guide

This guide will help you generate professional voiceovers for the EmailApp demo video using Microsoft Azure Text-to-Speech with enterprise security.

---

## Security-First Approach

### Why Azure TTS is Production-Ready:

✅ **Enterprise-grade security** - SOC 2, ISO 27001, HIPAA compliant
✅ **Data privacy** - Your script data is not used for training
✅ **Geographic control** - Choose data residency region
✅ **Encryption** - Data encrypted in transit and at rest
✅ **Access control** - Role-based access control (RBAC)
✅ **Audit logging** - Full activity logging for compliance
✅ **No data retention** - Audio is not stored by Microsoft

---

## Setup Instructions

### Step 1: Create Azure Speech Services Resource

1. **Sign in to Azure Portal**: https://portal.azure.com
2. **Create Resource**:
   - Click "Create a resource"
   - Search for "Speech Services"
   - Click "Create"

3. **Configure**:
   ```
   Subscription: [Your subscription]
   Resource Group: [Create new] emailapp-production
   Region: East US (or closest to you)
   Name: emailapp-tts
   Pricing Tier: Free (F0) or Standard (S0)
   ```

4. **Review + Create** → Click "Create"

5. **Get Credentials**:
   - Once deployed, go to resource
   - Click "Keys and Endpoint" in left menu
   - Copy **Key 1** and **Region**

### Step 2: Install Dependencies

```bash
cd C:\Users\coander\myprojects\EmailApp\scripts
npm install
```

This installs:
- `microsoft-cognitiveservices-speech-sdk` - Official Azure SDK

### Step 3: Configure Environment Variables

Create `.env` file (do NOT commit to git):

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your credentials
AZURE_SPEECH_KEY=your_key_from_step_1
AZURE_SPEECH_REGION=eastus
```

**Security Best Practices**:
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Never commit credentials to version control
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys every 90 days
- ✅ Use Azure Key Vault for production deployments

### Step 4: Generate Voiceovers

```bash
# Set environment variables (Windows PowerShell)
$env:AZURE_SPEECH_KEY = "your_key_here"
$env:AZURE_SPEECH_REGION = "eastus"

# Generate all voiceovers
node generate-voiceover.js

# Or use different voice
node generate-voiceover.js --voice en-US-GuyNeural --rate 1.0

# List available voices
node generate-voiceover.js --list-voices
```

**Output**: Creates `./voiceovers/` directory with 16 MP3 files (one per scene)

---

## Available Voice Options

### Recommended Professional Voices:

**Female (Recommended)**:
- `en-US-JennyNeural` - Professional, clear, authoritative ⭐
- `en-US-AriaNeural` - Warm, friendly, conversational
- `en-US-SaraNeural` - News anchor style, very clear

**Male (Recommended)**:
- `en-US-GuyNeural` - Professional, authoritative ⭐
- `en-US-DavisNeural` - Deep, executive voice
- `en-US-TonyNeural` - Friendly, approachable

To change voice, edit `CONFIG.voice` in `generate-voiceover.js` or use `--voice` flag.

---

## Pricing & Free Tier

### Free Tier (F0):
- **500,000 characters/month free**
- Neural voices included
- Perfect for this demo (script is ~800 words = ~5,000 characters)
- **Cost for this demo: $0** (well within free tier)

### Standard Tier (S0):
- $16 per 1 million characters (Neural voices)
- Pay-as-you-go
- Use for production at scale

**This demo script uses ~5,000 characters = $0.08 on paid tier**

---

## Alternative Secure Production Options

### 1. **ElevenLabs Enterprise** (Best Quality)
- **Security**: SOC 2 Type II, GDPR compliant
- **Quality**: Most realistic, human-like voices
- **Pricing**: Enterprise plan with SLA
- **Privacy**: No data retention, dedicated instance option
- **Best for**: High-end production videos

### 2. **Google Cloud Text-to-Speech**
- **Security**: ISO 27001, SOC 2/3, HIPAA compliant
- **Quality**: WaveNet voices (very natural)
- **Pricing**: $16 per 1M characters (Neural)
- **Privacy**: Data not used for training
- **Best for**: Google Cloud customers

### 3. **Amazon Polly**
- **Security**: SOC, PCI, ISO compliant
- **Quality**: Neural voices available
- **Pricing**: $16 per 1M characters (Neural)
- **Privacy**: Enterprise-grade security
- **Best for**: AWS ecosystem integration

### Comparison Table:

| Feature | Azure TTS | ElevenLabs | Google Cloud | Amazon Polly |
|---------|-----------|------------|--------------|--------------|
| **Security** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Voice Quality** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Free Tier** | 500K chars | 10K chars | 0-4M chars | 5M (12mo) |
| **Cost (paid)** | $16/1M | $99-$330/mo | $16/1M | $16/1M |
| **Enterprise** | ✅ | ✅ | ✅ | ✅ |
| **Compliance** | HIPAA, SOC | SOC 2, GDPR | HIPAA, SOC | SOC, HIPAA |
| **Best For** | MS ecosystem | Highest quality | GCP users | AWS users |

---

## Production Security Checklist

When deploying for production:

### Credential Management:
- [ ] Use Azure Key Vault to store API keys
- [ ] Enable Managed Identity (no keys in code)
- [ ] Rotate keys every 90 days
- [ ] Use separate keys for dev/staging/prod
- [ ] Implement key rotation automation

### Access Control:
- [ ] Enable Azure RBAC (Role-Based Access Control)
- [ ] Limit access to Speech resource to specific users
- [ ] Use service principals for automation
- [ ] Enable multi-factor authentication (MFA)

### Monitoring & Compliance:
- [ ] Enable Azure Monitor for activity logging
- [ ] Set up alerts for unusual usage patterns
- [ ] Review access logs monthly
- [ ] Document compliance requirements (GDPR, HIPAA, etc.)
- [ ] Enable Microsoft Defender for Cloud

### Network Security:
- [ ] Use private endpoints (VNet integration)
- [ ] Restrict public access if possible
- [ ] Enable firewall rules for IP allowlisting
- [ ] Use Azure Private Link for isolated access

### Data Protection:
- [ ] Ensure data residency compliance (choose correct region)
- [ ] Review Microsoft's data processing agreement
- [ ] Document data flow for privacy impact assessment
- [ ] Implement data retention policies

---

## Troubleshooting

### Error: "AZURE_SPEECH_KEY environment variable not set"
**Solution**: Export environment variables before running script
```bash
# Windows PowerShell
$env:AZURE_SPEECH_KEY = "your_key"
$env:AZURE_SPEECH_REGION = "eastus"

# Windows CMD
set AZURE_SPEECH_KEY=your_key
set AZURE_SPEECH_REGION=eastus

# Linux/Mac
export AZURE_SPEECH_KEY="your_key"
export AZURE_SPEECH_REGION="eastus"
```

### Error: "Invalid subscription key or region"
**Solution**:
1. Verify key from Azure Portal (Keys and Endpoint page)
2. Check region matches (e.g., "eastus" not "East US")
3. Ensure Speech Services resource is active

### Error: "Rate limit exceeded"
**Solution**: Script includes 500ms delay between scenes. If still hitting limits:
- Wait 60 seconds and retry
- Upgrade to Standard tier for higher quotas
- Use `--output` flag to resume from specific scene

### Poor Voice Quality
**Solution**:
- Ensure using Neural voices (not Standard)
- Adjust `speakingRate` in script (0.85-1.0 recommended)
- Try different voices with `--list-voices`

### Audio Files Too Large
**Solution**: Adjust `audioFormat` in script:
- Current: `audio-24khz-48kbitrate-mono-mp3` (high quality)
- Alternative: `audio-16khz-32kbitrate-mono-mp3` (smaller)

---

## Output Files

After running the script, you'll have:

```
voiceovers/
├── scene_1_Title_Card.mp3
├── scene_2_The_Problem.mp3
├── scene_3_The_Solution_Introduction.mp3
├── scene_4A_Fetch_Emails.mp3
├── scene_4B_Extract_Tasks.mp3
├── scene_4C_Task_Dashboard.mp3
├── scene_5A_Extract_Meeting_Info.mp3
├── scene_5B_Generate_Meeting_Prep.mp3
├── scene_6A_Generate_Draft.mp3
├── scene_6B_Refine_Draft.mp3
├── scene_6C_Draft_Management.mp3
├── scene_7A_Agent_Settings.mp3
├── scene_7B_Run_Agent_Now.mp3
├── scene_8_Value_Proposition_&_ROI.mp3
├── scene_9_Call_to_Action.mp3
└── scene_10_End_Card.mp3
```

**Total size**: ~5-8 MB for all files

---

## Next Steps

Once voiceovers are generated:

1. **Review Audio Quality**:
   - Listen to each scene
   - Verify timing matches VIDEO_SCRIPT.md
   - Adjust speaking rate if needed

2. **Import to Video Editor**:
   - DaVinci Resolve, Adobe Premiere, or Camtasia
   - Align with screen recordings
   - Add background music (lower volume during narration)

3. **Sync with Video**:
   - Use VIDEO_SCRIPT.md timing guide
   - Adjust video cuts to match audio
   - Add 0.5-1 second padding at scene transitions

4. **Quality Check**:
   - Ensure audio levels are consistent
   - Add subtle background music (-20dB to -25dB)
   - Export with proper audio codec (AAC, 192kbps)

---

## Support & Resources

- **Azure Speech Services Docs**: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/
- **Voice Gallery**: https://speech.microsoft.com/portal/voicegallery
- **Pricing Calculator**: https://azure.microsoft.com/en-us/pricing/calculator/
- **Security & Compliance**: https://learn.microsoft.com/en-us/azure/compliance/

---

## License & Attribution

This script uses Microsoft Azure Cognitive Services. By using this script, you agree to:
- Azure Terms of Service
- Microsoft Responsible AI principles
- Your organization's data protection policies

Generated audio is yours to use for the EmailApp demo video.

---

*Last Updated: 2026-02-09*
*Script Version: 1.0*
