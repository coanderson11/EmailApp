#!/usr/bin/env node

/**
 * Azure TTS Voiceover Generator for EmailApp Demo Video
 *
 * This script generates professional voiceovers using Microsoft Azure Cognitive Services
 * Text-to-Speech API with enterprise-grade security.
 *
 * Prerequisites:
 * - npm install microsoft-cognitiveservices-speech-sdk
 * - Azure subscription with Speech Services enabled
 * - Environment variables: AZURE_SPEECH_KEY and AZURE_SPEECH_REGION
 */

const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Azure credentials (load from environment variables for security)
  azureSpeechKey: process.env.AZURE_SPEECH_KEY,
  azureSpeechRegion: process.env.AZURE_SPEECH_REGION || 'eastus',

  // Voice settings - Azure Neural Voices (premium quality)
  voice: 'en-US-JennyNeural', // Professional female voice
  // Alternatives:
  // 'en-US-GuyNeural' - Professional male voice
  // 'en-US-AriaNeural' - Warm, friendly female
  // 'en-US-DavisNeural' - Authoritative male

  // Speech synthesis settings
  speakingRate: '0.95', // Slightly slower for clarity (0.5 - 2.0)
  pitch: '0%', // Neutral pitch (-50% to +50%)
  volume: '+0%', // Normal volume (-50% to +50%)

  // Output settings
  outputDir: './voiceovers',
  audioFormat: 'audio-24khz-48kbitrate-mono-mp3', // High quality MP3

  // Processing options
  generateIndividualScenes: true, // Generate separate file per scene
  generateCombined: false, // Generate single combined file
  addSilenceBetweenScenes: true, // Add 1 second silence between scenes
};

// ============================================================================
// NARRATION SCRIPT - Extracted from VIDEO_SCRIPT.md
// ============================================================================

const NARRATION = [
  {
    scene: 1,
    name: 'Title Card',
    duration: 8,
    text: 'EmailApp: AI-powered email and task management for Microsoft Outlook.',
    speakingRate: '0.9', // Slower for emphasis
  },
  {
    scene: 2,
    name: 'The Problem',
    duration: 22,
    text: 'As an executive, your inbox is overwhelming. Fifty new emails overnight. Back-to-back meetings with no time to prepare. Action items buried in email threads. And hours spent writing responses instead of making strategic decisions.',
    speakingRate: '1.0',
  },
  {
    scene: 3,
    name: 'The Solution Introduction',
    duration: 20,
    text: 'What if Claude could handle all of that for you? Through the Model Context Protocol, EmailApp gives Claude direct access to your Microsoft Outlook. It processes emails, extracts tasks, prepares you for meetings, and drafts responses—automatically.',
    speakingRate: '0.95',
  },
  {
    scene: '4A',
    name: 'Fetch Emails',
    duration: 20,
    text: "Let's start with Monday morning. Instead of manually triaging fifty emails, just ask Claude. It fetches your emails through Microsoft Graph API and instantly provides a structured summary.",
    speakingRate: '0.95',
  },
  {
    scene: '4B',
    name: 'Extract Tasks',
    duration: 40,
    text: 'This email from the CFO contains multiple action items. Instead of manually creating tasks, Claude automatically extracts them, assigns priorities, and sets due dates based on context.',
    speakingRate: '0.95',
  },
  {
    scene: '4C',
    name: 'Task Dashboard',
    duration: 40,
    text: 'You now have a real-time dashboard of what matters most. Nothing falls through the cracks. Every action item is tracked and prioritized.',
    speakingRate: '0.9', // Slower for emphasis
  },
  {
    scene: '5A',
    name: 'Extract Meeting Info',
    duration: 30,
    text: 'You have a meeting in thirty minutes with a key partner. Claude automatically extracts meeting details from calendar invites—attendees, agenda, location, and objectives.',
    speakingRate: '0.95',
  },
  {
    scene: '5B',
    name: 'Generate Meeting Prep',
    duration: 60,
    text: "Now here's where it gets powerful. Claude prepares you for this meeting by searching your entire email history with these attendees, identifying relevant context, and generating a comprehensive briefing document. You walk in fully prepared in minutes, not hours.",
    speakingRate: '0.9', // Slower for important point
  },
  {
    scene: '6A',
    name: 'Generate Draft',
    duration: 40,
    text: 'You receive an important email that requires a thoughtful response, but you\'re between meetings. Instead of context-switching, ask Claude to draft it for you. It analyzes the original email, follows your instructions, and generates a professional response in seconds.',
    speakingRate: '0.95',
  },
  {
    scene: '6B',
    name: 'Refine Draft',
    duration: 30,
    text: 'Want to adjust the tone? Simply tell Claude. It iterates on the draft conversationally, maintaining context while refining based on your feedback.',
    speakingRate: '0.95',
  },
  {
    scene: '6C',
    name: 'Draft Management',
    duration: 20,
    text: 'Manage all your drafts in one place. Review, refine, and send when ready. Nothing gets lost or forgotten.',
    speakingRate: '0.95',
  },
  {
    scene: '7A',
    name: 'Agent Settings',
    duration: 30,
    text: 'EmailApp can also work autonomously. Configure the agent to automatically process new emails, extract tasks, and generate drafts in the background—while you focus on strategic work.',
    speakingRate: '0.95',
  },
  {
    scene: '7B',
    name: 'Run Agent Now',
    duration: 30,
    text: 'Watch as the agent processes your entire inbox in one command. Tasks extracted, drafts generated, meetings prepared. This is what "zero inbox" actually looks like with AI assistance.',
    speakingRate: '1.0', // Normal pace for excitement
  },
  {
    scene: 8,
    name: 'Value Proposition & ROI',
    duration: 60,
    text: "Let's talk about value. Most executives save five to ten hours per week on email management and meeting preparation. That's 250 to 500 hours annually—over twelve weeks of work time back in your calendar. If your time is worth two hundred dollars per hour, that's thirty-nine thousand to one hundred fifty-six thousand dollars in value every year. And that's just time savings—it doesn't account for better decision-making from being more prepared, or reduced stress from a managed inbox. EmailApp integrates seamlessly with your existing Microsoft 365 infrastructure. It uses OAuth authentication—we never store your password. All communication happens through Microsoft's official Graph API with enterprise-grade security. You maintain full control through approval workflows, and there's a complete audit trail of every action Claude takes on your behalf.",
    speakingRate: '0.85', // Slower for important information
  },
  {
    scene: 9,
    name: 'Call to Action',
    duration: 30,
    text: 'EmailApp transforms Claude into your intelligent executive assistant. It handles the cognitive overhead of email management so you can focus on what matters most—strategic decisions that move your business forward. Ready to get started? Visit the link below to set up EmailApp with your Microsoft Outlook account. Experience the power of AI-assisted email management in your own inbox.',
    speakingRate: '0.95',
  },
  {
    scene: 10,
    name: 'End Card',
    duration: 10,
    text: 'EmailApp. AI-powered email management for Microsoft Outlook.',
    speakingRate: '0.85', // Slow for closing
  },
];

// ============================================================================
// AZURE TTS HELPER FUNCTIONS
// ============================================================================

/**
 * Creates Azure Speech SDK configuration
 */
function createSpeechConfig() {
  if (!CONFIG.azureSpeechKey) {
    throw new Error('AZURE_SPEECH_KEY environment variable is not set');
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    CONFIG.azureSpeechKey,
    CONFIG.azureSpeechRegion
  );

  speechConfig.speechSynthesisVoiceName = CONFIG.voice;
  speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat[CONFIG.audioFormat];

  return speechConfig;
}

/**
 * Generates SSML (Speech Synthesis Markup Language) for enhanced control
 */
function generateSSML(text, options = {}) {
  const rate = options.speakingRate || CONFIG.speakingRate;
  const pitch = options.pitch || CONFIG.pitch;
  const volume = options.volume || CONFIG.volume;

  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="${CONFIG.voice}">
        <prosody rate="${rate}" pitch="${pitch}" volume="${volume}">
          ${text}
        </prosody>
      </voice>
    </speak>
  `;
}

/**
 * Synthesizes speech from text and saves to file
 */
async function synthesizeSpeech(text, outputPath, options = {}) {
  return new Promise((resolve, reject) => {
    const speechConfig = createSpeechConfig();
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(outputPath);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    const ssml = generateSSML(text, options);

    console.log(`Generating: ${path.basename(outputPath)}...`);

    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log(`✓ Generated: ${path.basename(outputPath)}`);
          synthesizer.close();
          resolve(result);
        } else {
          console.error(`✗ Failed: ${result.errorDetails}`);
          synthesizer.close();
          reject(new Error(result.errorDetails));
        }
      },
      (error) => {
        console.error(`✗ Error: ${error}`);
        synthesizer.close();
        reject(error);
      }
    );
  });
}

/**
 * Generates silence audio file (for spacing between scenes)
 */
async function generateSilence(duration, outputPath) {
  const silenceText = '<break time="1000ms"/>'; // 1 second silence
  return synthesizeSpeech(silenceText, outputPath);
}

// ============================================================================
// MAIN GENERATION LOGIC
// ============================================================================

async function generateAllVoiceovers() {
  console.log('========================================');
  console.log('EmailApp Demo Voiceover Generator');
  console.log('========================================\n');

  // Create output directory
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${CONFIG.outputDir}\n`);
  }

  // Verify Azure credentials
  if (!CONFIG.azureSpeechKey) {
    console.error('ERROR: AZURE_SPEECH_KEY environment variable not set');
    console.error('\nPlease set your Azure Speech Services credentials:');
    console.error('  export AZURE_SPEECH_KEY="your-key-here"');
    console.error('  export AZURE_SPEECH_REGION="eastus"');
    process.exit(1);
  }

  console.log(`Voice: ${CONFIG.voice}`);
  console.log(`Region: ${CONFIG.azureSpeechRegion}`);
  console.log(`Output Format: ${CONFIG.audioFormat}`);
  console.log(`\nGenerating ${NARRATION.length} scenes...\n`);

  // Generate individual scene voiceovers
  if (CONFIG.generateIndividualScenes) {
    for (let i = 0; i < NARRATION.length; i++) {
      const scene = NARRATION[i];
      const fileName = `scene_${scene.scene}_${scene.name.replace(/\s+/g, '_')}.mp3`;
      const outputPath = path.join(CONFIG.outputDir, fileName);

      try {
        await synthesizeSpeech(scene.text, outputPath, {
          speakingRate: scene.speakingRate,
        });

        // Add small delay between API calls to avoid rate limiting
        if (i < NARRATION.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to generate ${fileName}:`, error.message);
      }
    }
  }

  console.log('\n========================================');
  console.log('✓ Voiceover generation complete!');
  console.log('========================================');
  console.log(`\nOutput directory: ${path.resolve(CONFIG.outputDir)}`);
  console.log(`Total scenes: ${NARRATION.length}`);
  console.log('\nNext steps:');
  console.log('1. Review generated audio files');
  console.log('2. Import into video editing software');
  console.log('3. Sync with screen recordings from VIDEO_SCRIPT.md');
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function printUsage() {
  console.log(`
Usage: node generate-voiceover.js [options]

Options:
  --help              Show this help message
  --list-voices       List available Azure Neural voices
  --voice <name>      Set voice name (default: en-US-JennyNeural)
  --rate <rate>       Set speaking rate (default: 0.95)
  --output <dir>      Set output directory (default: ./voiceovers)

Environment Variables:
  AZURE_SPEECH_KEY    Azure Speech Services subscription key (required)
  AZURE_SPEECH_REGION Azure region (default: eastus)

Examples:
  node generate-voiceover.js
  node generate-voiceover.js --voice en-US-GuyNeural --rate 1.0
  node generate-voiceover.js --list-voices
  `);
}

async function listVoices() {
  console.log('\nRecommended Azure Neural Voices for Professional Videos:\n');
  console.log('Female Voices:');
  console.log('  en-US-JennyNeural   - Professional, clear, authoritative (recommended)');
  console.log('  en-US-AriaNeural    - Warm, friendly, conversational');
  console.log('  en-US-SaraNeural    - Clear, professional, news-anchor style');
  console.log('  en-US-MichelleNeural - Warm, natural, engaging');
  console.log('\nMale Voices:');
  console.log('  en-US-GuyNeural     - Professional, authoritative (recommended)');
  console.log('  en-US-DavisNeural   - Deep, authoritative, executive');
  console.log('  en-US-TonyNeural    - Friendly, conversational');
  console.log('  en-US-JasonNeural   - Clear, professional');
  console.log('\nTo use a different voice, set CONFIG.voice in the script or use --voice flag');
  console.log('Full list: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support');
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('--help')) {
  printUsage();
  process.exit(0);
}

if (args.includes('--list-voices')) {
  listVoices();
  process.exit(0);
}

// Parse optional arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--voice' && args[i + 1]) {
    CONFIG.voice = args[i + 1];
    i++;
  } else if (args[i] === '--rate' && args[i + 1]) {
    CONFIG.speakingRate = args[i + 1];
    i++;
  } else if (args[i] === '--output' && args[i + 1]) {
    CONFIG.outputDir = args[i + 1];
    i++;
  }
}

// Run the generator
generateAllVoiceovers().catch((error) => {
  console.error('\n❌ Fatal error:', error.message);
  process.exit(1);
});
