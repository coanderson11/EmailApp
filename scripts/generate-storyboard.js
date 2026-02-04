/**
 * Storyboard Generator for EmailApp Demo Video
 *
 * Generates a comprehensive HTML storyboard document that includes:
 * - Scene breakdowns with timing
 * - Script text for each scene
 * - Voiceover file references
 * - Screenshot placeholders with capture notes
 * - On-screen text overlays
 * - Production notes
 */

const fs = require('fs');
const path = require('path');

// Scene data extracted from VIDEO_SCRIPT.md
const scenes = [
  {
    number: 1,
    title: "Title Card",
    timeRange: "0:00 - 0:08",
    duration: "8 seconds",
    voiceoverFile: "scene_1_Title_Card.mp3",
    narration: "EmailApp: AI-powered email and task management for Microsoft Outlook.",
    visualDescription: "Clean title screen with EmailApp logo/name. Subtitle: 'Transform Claude into Your Intelligent Email Assistant'. Background: Subtle gradient or blurred Outlook interface.",
    onScreenText: ["EmailApp", "Transform Claude into Your Intelligent Email Assistant"],
    screenshotNotes: [
      "Create title card graphic with logo",
      "Ensure high contrast and professional appearance",
      "Background should be subtle, not distracting"
    ],
    productionNotes: "Fade in from black. Soft background music starts."
  },
  {
    number: 2,
    title: "The Problem",
    timeRange: "0:08 - 0:30",
    duration: "22 seconds",
    voiceoverFile: "scene_2_The_Problem.mp3",
    narration: "As an executive, your inbox is overwhelming. Fifty new emails overnight. Back-to-back meetings with no time to prepare. Action items buried in email threads. And hours spent writing responses instead of making strategic decisions.",
    visualDescription: "Screen recording of overflowing Outlook inbox. Highlight unread count (50+ emails). Show calendar with back-to-back meetings. Quick cuts showing stress indicators.",
    onScreenText: ["⚠️ 50+ Unread Emails", "⚠️ No Time to Prepare for Meetings", "⚠️ Tasks Lost in Threads", "⚠️ Hours on Email Daily"],
    screenshotNotes: [
      "Capture Outlook inbox with 50+ unread emails (blur sensitive content)",
      "Capture calendar view showing back-to-back meetings",
      "Show email threads with action items buried deep",
      "Create stress indicator visuals"
    ],
    productionNotes: "Fast-paced cuts (3-5 seconds each). Build tension with pacing."
  },
  {
    number: 3,
    title: "The Solution Introduction",
    timeRange: "0:30 - 0:50",
    duration: "20 seconds",
    voiceoverFile: "scene_3_The_Solution_Introduction.mp3",
    narration: "What if Claude could handle all of that for you? Through the Model Context Protocol, EmailApp gives Claude direct access to your Microsoft Outlook. It processes emails, extracts tasks, prepares you for meetings, and drafts responses—automatically.",
    visualDescription: "Claude Desktop app opens. Show clean interface. MCP connection indicator. Transition to split screen: Claude on left, Outlook on right.",
    onScreenText: ["EmailApp + Claude + Microsoft Outlook", "= Your AI Executive Assistant"],
    screenshotNotes: [
      "Capture Claude Desktop opening animation",
      "Show MCP connection indicator (green check or similar)",
      "Create split-screen layout: Claude left, Outlook right",
      "Highlight the connection between the two apps"
    ],
    productionNotes: "Show smooth transitions. Emphasize 'direct access' with visual connection. Split screen shows integration."
  },
  {
    number: "4A",
    title: "Fetch Emails",
    timeRange: "0:50 - 1:10",
    duration: "20 seconds",
    voiceoverFile: "scene_4A_Fetch_Emails.mp3",
    narration: "Let's start with Monday morning. Instead of manually triaging fifty emails, just ask Claude. It fetches your emails through Microsoft Graph API and instantly provides a structured summary.",
    visualDescription: "Claude Desktop interface in focus. Type in real-time: 'Can you fetch my recent emails and give me a summary?'. Show tool execution: fetch_emails tool activates. Display email summary results.",
    onScreenText: ["User Input: 'Can you fetch my recent emails and give me a summary?'", "Tool: fetch_emails ✓", "Retrieved: 25 emails", "Processing..."],
    screenshotNotes: [
      "Screen record typing the user prompt",
      "Capture the tool execution animation (fetch_emails)",
      "Capture the structured email summary with priority levels",
      "Zoom in on HIGH PRIORITY section"
    ],
    productionNotes: "Show typing animation or real typing. Highlight tool execution in UI. Zoom in on key results."
  },
  {
    number: "4B",
    title: "Extract Tasks",
    timeRange: "1:10 - 1:50",
    duration: "40 seconds",
    voiceoverFile: "scene_4B_Extract_Tasks.mp3",
    narration: "This email from the CFO contains multiple action items. Instead of manually creating tasks, Claude automatically extracts them, assigns priorities, and sets due dates based on context.",
    visualDescription: "Focus on specific email from CFO about Q1 Budget. Show email content with multiple action items visible. Type: 'Extract all tasks from this CFO email and prioritize them'. Show extract_tasks_from_email tool activation. Display extracted tasks list.",
    onScreenText: ["User Input: 'Extract all tasks from this CFO email and prioritize them'", "Tool: extract_tasks_from_email ✓", "AI Analysis: Extracting actionable items..."],
    screenshotNotes: [
      "Capture CFO email with multiple action items",
      "Screen record typing the extraction prompt",
      "Capture tool execution animation",
      "Capture extracted task list with priorities and due dates",
      "Split screen: email on left, tasks on right"
    ],
    productionNotes: "Split screen: email on left, extracted tasks on right. Animate task cards appearing. Highlight priority indicators (HIGH/MEDIUM)."
  },
  {
    number: "4C",
    title: "Task Dashboard",
    timeRange: "1:50 - 2:30",
    duration: "40 seconds",
    voiceoverFile: "scene_4C_Task_Dashboard.mp3",
    narration: "You now have a real-time dashboard of what matters most. Nothing falls through the cracks. Every action item is tracked and prioritized.",
    visualDescription: "Type: 'Show me my task dashboard with statistics'. Show get_task_stats tool execution. Display visual task dashboard/statistics.",
    onScreenText: ["User Input: 'Show me my task dashboard with statistics'", "Tool: get_task_stats ✓"],
    screenshotNotes: [
      "Screen record typing the dashboard request",
      "Capture tool execution",
      "Capture full task dashboard with statistics",
      "Create visual representation with icons and colors",
      "Highlight URGENT tasks section"
    ],
    productionNotes: "Show visual dashboard (can be Claude's text formatted nicely). Use icons and colors for visual appeal. Emphasize 'nothing falls through the cracks'."
  },
  {
    number: "5A",
    title: "Extract Meeting Info",
    timeRange: "2:30 - 3:00",
    duration: "30 seconds",
    voiceoverFile: "scene_5A_Extract_Meeting_Info.mp3",
    narration: "You have a meeting in thirty minutes with a key partner. Claude automatically extracts meeting details from calendar invites—attendees, agenda, location, and objectives.",
    visualDescription: "Show calendar invite email. Type: 'Extract meeting information from my recent calendar invites'. Show extract_meeting_info tool execution. Display upcoming meetings list.",
    onScreenText: ["User Input: 'Extract meeting information from my recent calendar invites'", "Tool: extract_meeting_info ✓", "Scanning calendar invites..."],
    screenshotNotes: [
      "Capture calendar invite email",
      "Screen record typing the extraction prompt",
      "Capture tool execution",
      "Capture structured meeting list with all details",
      "Show calendar view transforming to structured list"
    ],
    productionNotes: "Show calendar view transforming to structured list. Highlight key meeting coming up soon."
  },
  {
    number: "5B",
    title: "Generate Meeting Prep",
    timeRange: "3:00 - 4:00",
    duration: "60 seconds",
    voiceoverFile: "scene_5B_Generate_Meeting_Prep.mp3",
    narration: "Now here's where it gets powerful. Claude prepares you for this meeting by searching your entire email history with these attendees, identifying relevant context, and generating a comprehensive briefing document. You walk in fully prepared in minutes, not hours.",
    visualDescription: "Type: 'Prepare me for the Partnership Strategy meeting with Sarah Chen'. Show prepare_meeting_context tool execution. Display generated meeting prep document (scroll through it).",
    onScreenText: ["User Input: 'Prepare me for the Partnership Strategy meeting with Sarah Chen'", "Tool: prepare_meeting_context ✓", "Searching email history...", "Analyzing context...", "Generating briefing..."],
    screenshotNotes: [
      "Screen record typing the preparation request",
      "Capture tool execution with progress indicators",
      "Capture full meeting prep document",
      "Slowly scroll through all sections",
      "Highlight key sections: Recent Communication, Discussion Topics, Action Items"
    ],
    productionNotes: "Slowly scroll through the meeting prep document. Highlight key sections as you scroll. Emphasize comprehensiveness and detail. Add subtle emphasis animations on key points."
  },
  {
    number: "6A",
    title: "Generate Draft",
    timeRange: "4:00 - 4:40",
    duration: "40 seconds",
    voiceoverFile: "scene_6A_Generate_Draft.mp3",
    narration: "You receive an important email that requires a thoughtful response, but you're between meetings. Instead of context-switching, ask Claude to draft it for you. It analyzes the original email, follows your instructions, and generates a professional response in seconds.",
    visualDescription: "Show email that needs response (important client inquiry). Type: 'Generate a professional draft response to this email. Acknowledge their concerns, propose a meeting next week, and maintain a collaborative tone.' Show generate_draft tool execution. Display generated draft email.",
    onScreenText: ["User Input: 'Generate a professional draft response. Acknowledge concerns, propose meeting next week, collaborative tone.'", "Tool: generate_draft ✓", "Analyzing original email...", "Following instructions...", "Generating draft..."],
    screenshotNotes: [
      "Capture original client email (concerns about timeline)",
      "Screen record typing the draft instructions",
      "Capture tool execution",
      "Capture generated draft response",
      "Split screen: original email → draft response",
      "Highlight how instructions were followed"
    ],
    productionNotes: "Split screen: original email → draft response. Highlight how Claude followed instructions (acknowledge, propose meeting, collaborative). Show draft status indicator."
  },
  {
    number: "6B",
    title: "Refine Draft",
    timeRange: "4:40 - 5:10",
    duration: "30 seconds",
    voiceoverFile: "scene_6B_Refine_Draft.mp3",
    narration: "Want to adjust the tone? Simply tell Claude. It iterates on the draft conversationally, maintaining context while refining based on your feedback.",
    visualDescription: "Type: 'Make the draft more direct and add a specific meeting time proposal'. Show update_draft tool execution. Display updated draft with changes highlighted.",
    onScreenText: ["User Input: 'Make it more direct and add specific meeting time proposal'", "Tool: update_draft ✓", "Revising draft..."],
    screenshotNotes: [
      "Screen record typing the revision request",
      "Capture tool execution",
      "Capture updated draft with changes",
      "Show diff/changes visually if possible",
      "Highlight: more direct language, specific time added"
    ],
    productionNotes: "Highlight changes made (more direct language, specific time). Show diff/changes visually if possible. Emphasize conversational iteration."
  },
  {
    number: "6C",
    title: "Draft Management",
    timeRange: "5:10 - 5:30",
    duration: "20 seconds",
    voiceoverFile: "scene_6C_Draft_Management.mp3",
    narration: "Manage all your drafts in one place. Review, refine, and send when ready. Nothing gets lost or forgotten.",
    visualDescription: "Type: 'Show me all my pending drafts'. Show list_drafts tool execution. Display list of all draft emails.",
    onScreenText: ["User Input: 'Show me all my pending drafts'", "Tool: list_drafts ✓"],
    screenshotNotes: [
      "Screen record typing the list request",
      "Capture tool execution",
      "Capture clean draft list interface",
      "Show multiple pending drafts with status"
    ],
    productionNotes: "Show clean list interface. Emphasize organization and control."
  },
  {
    number: "7A",
    title: "Agent Settings",
    timeRange: "5:30 - 6:00",
    duration: "30 seconds",
    voiceoverFile: "scene_7A_Agent_Settings.mp3",
    narration: "EmailApp can also work autonomously. Configure the agent to automatically process new emails, extract tasks, and generate drafts in the background—while you focus on strategic work.",
    visualDescription: "Type: 'Show my agent settings'. Show get_agent_settings tool execution. Display agent configuration panel.",
    onScreenText: ["User Input: 'Show my agent settings'", "Tool: get_agent_settings ✓"],
    screenshotNotes: [
      "Screen record typing the settings request",
      "Capture tool execution",
      "Capture agent configuration panel with all toggles",
      "Show enabled features with checkmarks",
      "Highlight approval settings for safety"
    ],
    productionNotes: "Show toggle switches for each setting. Emphasize 'you approve' safety."
  },
  {
    number: "7B",
    title: "Run Agent Now",
    timeRange: "6:00 - 6:30",
    duration: "30 seconds",
    voiceoverFile: "scene_7B_Run_Agent_Now.mp3",
    narration: "Watch as the agent processes your entire inbox in one command. Tasks extracted, drafts generated, meetings prepared. This is what 'zero inbox' actually looks like with AI assistance.",
    visualDescription: "Type: 'Run the agent now and process all my unread emails'. Show run_agent_now tool execution with loading animation. Display agent activity summary.",
    onScreenText: ["User Input: 'Run the agent now and process all unread emails'", "Tool: run_agent_now ✓", "🤖 Agent Running...", "⏳ Processing unread emails..."],
    screenshotNotes: [
      "Screen record typing the agent command",
      "Capture loading animation/progress",
      "Capture complete activity summary",
      "Animate numbers counting up",
      "Highlight time saved metric (big reveal)"
    ],
    productionNotes: "Show loading animation/progress. Animate numbers counting up. Big reveal of time saved."
  },
  {
    number: 8,
    title: "Value Proposition & ROI",
    timeRange: "6:30 - 7:30",
    duration: "60 seconds",
    voiceoverFile: "scene_8_Value_Proposition_&_ROI.mp3",
    narration: "Let's talk about value. Most executives save five to ten hours per week on email management and meeting preparation. That's 250 to 500 hours annually—over twelve weeks of work time back in your calendar. If your time is worth two hundred dollars per hour, that's thirty-nine thousand to one hundred fifty-six thousand dollars in value every year. And that's just time savings—it doesn't account for better decision-making from being more prepared, or reduced stress from a managed inbox. EmailApp integrates seamlessly with your existing Microsoft 365 infrastructure. It uses OAuth authentication—we never store your password. All communication happens through Microsoft's official Graph API with enterprise-grade security. You maintain full control through approval workflows, and there's a complete audit trail of every action Claude takes on your behalf.",
    visualDescription: "Infographic-style screen showing statistics. Clean background with key metrics appearing. Can use simple animations or static visuals.",
    onScreenText: ["⏱️ TIME SAVINGS", "5-10 hours per week", "= 250-500 hours annually", "= 12+ weeks of work time", "", "💰 VALUE CALCULATION", "$200/hour × 250 hours = $39,000/year", "$300/hour × 500 hours = $156,000/year", "", "🔒 SECURITY", "✓ Microsoft OAuth", "✓ Official Graph API", "✓ Enterprise encryption", "✓ Full approval workflows", "✓ Complete audit trail"],
    screenshotNotes: [
      "Create infographic showing time savings",
      "Create infographic showing value calculation",
      "Create security features visual",
      "Create benefits checklist",
      "Use charts/graphs if possible",
      "Professional, clean design with animations"
    ],
    productionNotes: "Clean, professional infographic style. Animate numbers and checkmarks appearing. Use charts/graphs if possible. Build trust with security emphasis."
  },
  {
    number: 9,
    title: "Call to Action",
    timeRange: "7:30 - 8:00",
    duration: "30 seconds",
    voiceoverFile: "scene_9_Call_to_Action.mp3",
    narration: "EmailApp transforms Claude into your intelligent executive assistant. It handles the cognitive overhead of email management so you can focus on what matters most—strategic decisions that move your business forward. Ready to get started? Visit the link below to set up EmailApp with your Microsoft Outlook account. Experience the power of AI-assisted email management in your own inbox.",
    visualDescription: "Return to Claude Desktop with EmailApp running. Show all three pillars briefly (quick montage). Transition to final screen with contact info.",
    onScreenText: ["🚀 Get Started with EmailApp", "✓ Seamless Microsoft Outlook integration", "✓ 2-minute setup", "✓ Free and open-source", "", "📚 Documentation & Setup:", "github.com/[your-repo]/emailapp"],
    screenshotNotes: [
      "Quick montage: email processing, meeting prep, drafts",
      "Create final call-to-action screen",
      "Show GitHub link clearly",
      "Professional, inviting design"
    ],
    productionNotes: "Show quick montage of key features. Clear call-to-action. Professional closing."
  },
  {
    number: 10,
    title: "End Card",
    timeRange: "8:00 - 8:10",
    duration: "10 seconds",
    voiceoverFile: "scene_10_End_Card.mp3",
    narration: "EmailApp. AI-powered email management for Microsoft Outlook.",
    visualDescription: "Clean end screen with EmailApp branding. Social media links. Documentation links.",
    onScreenText: ["EmailApp", "🌐 github.com/[your-repo]", "📧 support@emailapp.com", "🐦 @emailapp", "", "Built with Claude & MCP"],
    screenshotNotes: [
      "Create professional end card",
      "Include all contact links",
      "Clean, memorable branding",
      "Ready for fade to black"
    ],
    productionNotes: "Fade to black. Music fade out. Professional closing."
  }
];

// Generate HTML storyboard
function generateStoryboard() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EmailApp Demo Video - Storyboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 40px;
      text-align: center;
      border-radius: 12px;
      margin-bottom: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    header h1 {
      font-size: 3em;
      margin-bottom: 10px;
      font-weight: 700;
    }

    header p {
      font-size: 1.3em;
      opacity: 0.95;
    }

    .scene {
      background: white;
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      page-break-inside: avoid;
    }

    .scene-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #667eea;
    }

    .scene-number {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: bold;
      font-size: 1.1em;
    }

    .scene-time {
      display: inline-block;
      background: #f0f0f0;
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: bold;
      color: #666;
    }

    .scene-title {
      font-size: 2em;
      color: #333;
      margin: 15px 0;
      font-weight: 600;
    }

    .section {
      margin: 25px 0;
    }

    .section-title {
      font-size: 1.2em;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
    }

    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 20px;
      background: #667eea;
      margin-right: 10px;
      border-radius: 2px;
    }

    .voiceover {
      background: #fff9e6;
      border-left: 4px solid #ffc107;
      padding: 20px;
      border-radius: 8px;
      font-style: italic;
      line-height: 1.8;
    }

    .voiceover-file {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 15px;
      border-radius: 8px;
      margin-top: 10px;
      font-family: 'Courier New', monospace;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .voiceover-file::before {
      content: '🎵';
      margin-right: 10px;
      font-size: 1.3em;
    }

    .visual-description {
      background: #f0f4ff;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.8;
    }

    .screenshot-placeholder {
      background: #e8e8e8;
      border: 3px dashed #999;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      margin: 20px 0;
      min-height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .screenshot-placeholder::before {
      content: '📷';
      font-size: 4em;
      margin-bottom: 15px;
    }

    .screenshot-notes {
      background: #fff3e0;
      border-left: 4px solid #ff9800;
      padding: 20px;
      border-radius: 8px;
      margin-top: 15px;
    }

    .screenshot-notes ul {
      list-style: none;
      padding: 0;
    }

    .screenshot-notes li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }

    .screenshot-notes li::before {
      content: '📌';
      position: absolute;
      left: 0;
    }

    .on-screen-text {
      background: #f3e5f5;
      border-left: 4px solid #9c27b0;
      padding: 20px;
      border-radius: 8px;
    }

    .on-screen-text-item {
      background: white;
      padding: 12px 15px;
      margin: 8px 0;
      border-radius: 6px;
      border: 1px solid #ddd;
      font-weight: 500;
    }

    .production-notes {
      background: #e8f5e9;
      border-left: 4px solid #4caf50;
      padding: 15px;
      border-radius: 8px;
      font-size: 0.95em;
    }

    .production-notes::before {
      content: '🎬 ';
      font-weight: bold;
    }

    footer {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 0.9em;
    }

    @media print {
      body {
        background: white;
      }

      .scene {
        box-shadow: none;
        border: 1px solid #ddd;
        page-break-inside: avoid;
      }

      header {
        background: #667eea;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>EmailApp Demo Video</h1>
      <p>Professional Storyboard & Production Reference</p>
      <p style="font-size: 0.9em; margin-top: 20px; opacity: 0.9;">
        Total Duration: 8-10 minutes | ${scenes.length} Scenes
      </p>
    </header>

    ${scenes.map(scene => `
    <div class="scene">
      <div class="scene-header">
        <div>
          <span class="scene-number">Scene ${scene.number}</span>
          <h2 class="scene-title">${scene.title}</h2>
        </div>
        <div>
          <span class="scene-time">${scene.timeRange}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">⏱️ Duration</div>
        <p><strong>${scene.duration}</strong></p>
      </div>

      <div class="section">
        <div class="section-title">🎙️ Voiceover Narration</div>
        <div class="voiceover">
          "${scene.narration}"
        </div>
        <div class="voiceover-file">
          <span><strong>Audio File:</strong> voiceovers/${scene.voiceoverFile}</span>
          <span style="color: #2196f3; font-weight: bold;">MP3</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🎥 Visual Description</div>
        <div class="visual-description">
          ${scene.visualDescription}
        </div>
      </div>

      <div class="section">
        <div class="section-title">📸 Screenshot Requirements</div>
        <div class="screenshot-placeholder">
          <div>
            <strong style="font-size: 1.3em; color: #666;">SCREENSHOT PLACEHOLDER</strong>
            <p style="color: #999; margin-top: 10px;">Scene ${scene.number}: ${scene.title}</p>
          </div>
        </div>
        <div class="screenshot-notes">
          <strong>📋 Capture Notes:</strong>
          <ul>
            ${scene.screenshotNotes.map(note => `<li>${note}</li>`).join('')}
          </ul>
        </div>
      </div>

      ${scene.onScreenText && scene.onScreenText.length > 0 ? `
      <div class="section">
        <div class="section-title">💬 On-Screen Text Overlays</div>
        <div class="on-screen-text">
          ${scene.onScreenText.map(text =>
            text ? `<div class="on-screen-text-item">${text}</div>` : '<div style="height: 10px;"></div>'
          ).join('')}
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="production-notes">
          <strong>Production Notes:</strong> ${scene.productionNotes}
        </div>
      </div>
    </div>
    `).join('')}

    <footer>
      <p><strong>EmailApp Demo Video Storyboard</strong></p>
      <p>Generated: ${new Date().toLocaleDateString()}</p>
      <p style="margin-top: 20px;">
        💡 <strong>Usage:</strong> Use this storyboard as your video editing reference.<br>
        Match voiceover files to scenes, capture screenshots as noted, and align timing.<br>
        Print to PDF for offline reference during production.
      </p>
    </footer>
  </div>
</body>
</html>`;

  return html;
}

// Main execution
function main() {
  console.log('🎬 Generating EmailApp Video Storyboard...\n');

  const html = generateStoryboard();
  const outputPath = path.join(__dirname, 'storyboard.html');

  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log('✅ Storyboard generated successfully!');
  console.log(`📄 Output file: ${outputPath}`);
  console.log('\n📋 Next steps:');
  console.log('   1. Open storyboard.html in your web browser');
  console.log('   2. Print to PDF for offline reference (Ctrl/Cmd + P)');
  console.log('   3. Use during video production to align:');
  console.log('      - Voiceover audio files');
  console.log('      - Screen recordings & screenshots');
  console.log('      - On-screen text overlays');
  console.log('      - Scene timing');
  console.log('\n🎥 Ready for video production!');
}

main();
