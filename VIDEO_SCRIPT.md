# EmailApp Demo Video Script & Storyboard

**Total Duration**: 8-10 minutes
**Format**: Screen recording with voiceover narration
**Style**: Professional, concise, executive-focused

---

## Scene 1: Title Card (0:00 - 0:08)

### Visual
- Clean title screen with EmailApp logo/name
- Subtitle: "Transform Claude into Your Intelligent Email Assistant"
- Background: Subtle gradient or blurred Outlook interface

### Narration
*"EmailApp: AI-powered email and task management for Microsoft Outlook."*

### On-Screen Text
```
EmailApp
Transform Claude into Your Intelligent Email Assistant
```

### Production Notes
- 8 seconds
- Fade in from black
- Soft background music starts

---

## Scene 2: The Problem (0:08 - 0:30)

### Visual
- Screen recording of overflowing Outlook inbox
- Highlight unread count (50+ emails)
- Show calendar with back-to-back meetings
- Quick cuts showing stress indicators

### Narration
*"As an executive, your inbox is overwhelming. Fifty new emails overnight. Back-to-back meetings with no time to prepare. Action items buried in email threads. And hours spent writing responses instead of making strategic decisions."*

### On-Screen Text Overlays
```
⚠️ 50+ Unread Emails
⚠️ No Time to Prepare for Meetings
⚠️ Tasks Lost in Threads
⚠️ Hours on Email Daily
```

### Production Notes
- 22 seconds
- Fast-paced cuts (3-5 seconds each)
- Show real inbox but blur sensitive content
- Build tension with pacing

---

## Scene 3: The Solution Introduction (0:30 - 0:50)

### Visual
- Claude Desktop app opens
- Show clean interface
- MCP connection indicator
- Transition to split screen: Claude on left, Outlook on right

### Narration
*"What if Claude could handle all of that for you? Through the Model Context Protocol, EmailApp gives Claude direct access to your Microsoft Outlook. It processes emails, extracts tasks, prepares you for meetings, and drafts responses—automatically."*

### On-Screen Text
```
EmailApp + Claude + Microsoft Outlook
= Your AI Executive Assistant
```

### Production Notes
- 20 seconds
- Show smooth transitions
- Emphasize "direct access" with visual connection
- Split screen shows integration

---

## Scene 4: Feature Pillar 1 - Intelligent Email Processing (0:50 - 2:30)

### Screen 4A: Fetch Emails (0:50 - 1:10)

#### Visual
- Claude Desktop interface in focus
- Type in real-time: "Can you fetch my recent emails and give me a summary?"
- Show tool execution: `fetch_emails` tool activates
- Display email summary results

#### Narration
*"Let's start with Monday morning. Instead of manually triaging fifty emails, just ask Claude. It fetches your emails through Microsoft Graph API and instantly provides a structured summary."*

#### On-Screen Text
```
User Input: "Can you fetch my recent emails and give me a summary?"

Tool: fetch_emails ✓
Retrieved: 25 emails
Processing...
```

#### Sample Claude Output to Show
```
I've fetched your 25 most recent emails. Here's what needs attention:

HIGH PRIORITY (5 emails):
- CFO: Q1 Budget Review - requires action by Friday
- Client Services: Urgent issue with Project X
- Board Member: Strategic planning feedback needed

MEDIUM PRIORITY (12 emails):
- Team updates and status reports
- Meeting confirmations

LOW PRIORITY (8 emails):
- Newsletters and announcements
```

#### Production Notes
- 20 seconds
- Show typing animation or real typing
- Highlight tool execution in UI
- Zoom in on key results

---

### Screen 4B: Extract Tasks (1:10 - 1:50)

#### Visual
- Focus on specific email from CFO about Q1 Budget
- Show email content with multiple action items visible
- Type: "Extract all tasks from this CFO email and prioritize them"
- Show `extract_tasks_from_email` tool activation
- Display extracted tasks list

#### Narration
*"This email from the CFO contains multiple action items. Instead of manually creating tasks, Claude automatically extracts them, assigns priorities, and sets due dates based on context."*

#### On-Screen Text
```
User Input: "Extract all tasks from this CFO email and prioritize them"

Tool: extract_tasks_from_email ✓
AI Analysis: Extracting actionable items...
```

#### Sample Claude Output to Show
```
I've extracted 4 tasks from the CFO email:

1. ⚠️ HIGH PRIORITY - Review Q1 budget variance report
   Due: Friday, Feb 14
   Category: Finance

2. ⚠️ HIGH PRIORITY - Prepare cost reduction proposal
   Due: Friday, Feb 14
   Category: Strategic Planning

3. 🔷 MEDIUM - Schedule follow-up meeting with finance team
   Due: Next week
   Category: Meeting

4. 🔷 MEDIUM - Update department heads on budget status
   Due: Feb 20
   Category: Communication

All tasks saved to your task list.
```

#### Production Notes
- 40 seconds
- Split screen: email on left, extracted tasks on right
- Animate task cards appearing
- Highlight priority indicators (HIGH/MEDIUM)

---

### Screen 4C: Task Dashboard (1:50 - 2:30)

#### Visual
- Type: "Show me my task dashboard with statistics"
- Show `get_task_stats` tool execution
- Display visual task dashboard/statistics

#### Narration
*"You now have a real-time dashboard of what matters most. Nothing falls through the cracks. Every action item is tracked and prioritized."*

#### On-Screen Text
```
User Input: "Show me my task dashboard with statistics"

Tool: get_task_stats ✓
```

#### Sample Claude Output to Show
```
📊 Your Task Dashboard

TOTAL TASKS: 23

By Priority:
⚠️  High Priority: 8 tasks
🔷  Medium Priority: 11 tasks
🟢  Low Priority: 4 tasks

By Status:
⏳ Pending: 15 tasks
🔄 In Progress: 5 tasks
✅ Completed: 3 tasks

By Category:
📧 Communication: 7 tasks
💼 Strategic Planning: 5 tasks
💰 Finance: 4 tasks
📅 Meeting Prep: 7 tasks

⚠️ URGENT: 3 tasks due in next 48 hours
```

#### Production Notes
- 40 seconds
- Show visual dashboard (can be Claude's text formatted nicely)
- Use icons and colors for visual appeal
- Emphasize "nothing falls through the cracks"

---

## Scene 5: Feature Pillar 2 - Meeting Preparation (2:30 - 4:00)

### Screen 5A: Extract Meeting Info (2:30 - 3:00)

#### Visual
- Show calendar invite email
- Type: "Extract meeting information from my recent calendar invites"
- Show `extract_meeting_info` tool execution
- Display upcoming meetings list

#### Narration
*"You have a meeting in thirty minutes with a key partner. Claude automatically extracts meeting details from calendar invites—attendees, agenda, location, and objectives."*

#### On-Screen Text
```
User Input: "Extract meeting information from my recent calendar invites"

Tool: extract_meeting_info ✓
Scanning calendar invites...
```

#### Sample Claude Output to Show
```
📅 Upcoming Meetings Extracted:

1. Partnership Strategy Discussion
   📅 Today, 2:00 PM - 3:00 PM
   📍 Conference Room B / Teams
   👥 Attendees: Sarah Chen (Partner Co), Michael Torres (Sales), You
   📋 Agenda: Q2 partnership expansion, new market opportunities

2. Q1 Board Review
   📅 Tomorrow, 10:00 AM - 12:00 PM
   📍 Board Room
   👥 Attendees: Board Members (8), Executive Team
   📋 Agenda: Financial review, strategic initiatives update

3. Team Standup
   📅 Today, 4:00 PM
   📍 Virtual
   👥 Attendees: Direct reports (6)
```

#### Production Notes
- 30 seconds
- Show calendar view transforming to structured list
- Highlight key meeting coming up soon

---

### Screen 5B: Generate Meeting Prep (3:00 - 4:00)

#### Visual
- Type: "Prepare me for the Partnership Strategy meeting with Sarah Chen"
- Show `prepare_meeting_context` tool execution
- Display generated meeting prep document (scroll through it)

#### Narration
*"Now here's where it gets powerful. Claude prepares you for this meeting by searching your entire email history with these attendees, identifying relevant context, and generating a comprehensive briefing document. You walk in fully prepared in minutes, not hours."*

#### On-Screen Text
```
User Input: "Prepare me for the Partnership Strategy meeting with Sarah Chen"

Tool: prepare_meeting_context ✓
Searching email history...
Analyzing context...
Generating briefing...
```

#### Sample Claude Output to Show
```
🎯 Meeting Preparation: Partnership Strategy with Sarah Chen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 MEETING OVERVIEW
• Meeting: Partnership Strategy Discussion
• Date: Today, 2:00 PM - 3:00 PM
• Duration: 1 hour
• Attendees: Sarah Chen (Partner Co), Michael Torres, You
• Objective: Discuss Q2 expansion and new market opportunities

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 RECENT COMMUNICATION HISTORY

Last communication: 5 days ago
Total emails exchanged: 18 in past 30 days

Key Thread (Feb 4):
• Sarah expressed strong interest in expanding to West Coast markets
• Mentioned their budget approval for Q2 is confirmed ($500K)
• Requested our pricing proposal by end of week

Previous Thread (Jan 28):
• Discussed integration challenges with their legacy CRM
• You committed to technical feasibility assessment
• Follow-up action item: Share integration timeline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 KEY DISCUSSION TOPICS

1. West Coast Market Expansion
   • Sarah's priority for Q2
   • Budget approved: $500K
   • Your preparation: Review regional pricing models

2. Technical Integration Update
   • Status on CRM integration assessment
   • Timeline commitments needed
   • Potential blockers to address

3. Pricing Proposal Status
   • Due: End of this week (Feb 14)
   • Sarah is waiting on this for internal approval
   • ACTION: Confirm delivery date

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 SUGGESTED TALKING POINTS

Opening:
• Acknowledge their Q2 budget approval (congratulate Sarah)
• Reference West Coast expansion interest
• Set agenda for the hour

During Discussion:
• Present technical integration timeline (be specific)
• Address any CRM concerns proactively
• Discuss pricing proposal—confirm delivery by Feb 14
• Explore additional market opportunities beyond West Coast

Closing:
• Summarize action items for both parties
• Set next meeting date for proposal review
• Express enthusiasm about partnership growth

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ACTION ITEMS FROM PREVIOUS MEETINGS

✅ COMPLETED:
• Technical feasibility assessment (done Jan 30)

⏳ PENDING:
• Share integration timeline (due today)
• Deliver pricing proposal (due Feb 14)
• Schedule follow-up with Michael on sales strategy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📎 RELEVANT DOCUMENTS
• Partnership Agreement Draft (signed Jan 15)
• Q4 Performance Report (shared Jan 22)
• Integration Technical Specs (sent Jan 30)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're fully prepared for this meeting! 🎯
```

#### Production Notes
- 60 seconds
- Slowly scroll through the meeting prep document
- Highlight key sections as you scroll
- Emphasize comprehensiveness and detail
- Add subtle emphasis animations on key points

---

## Scene 6: Feature Pillar 3 - Intelligent Drafts (4:00 - 5:30)

### Screen 6A: Generate Draft (4:00 - 4:40)

#### Visual
- Show email that needs response (important client inquiry)
- Type: "Generate a professional draft response to this email. Acknowledge their concerns, propose a meeting next week, and maintain a collaborative tone."
- Show `generate_draft` tool execution
- Display generated draft email

#### Narration
*"You receive an important email that requires a thoughtful response, but you're between meetings. Instead of context-switching, ask Claude to draft it for you. It analyzes the original email, follows your instructions, and generates a professional response in seconds."*

#### On-Screen Text
```
User Input: "Generate a professional draft response. Acknowledge concerns, propose meeting next week, collaborative tone."

Tool: generate_draft ✓
Analyzing original email...
Following instructions...
Generating draft...
```

#### Sample Original Email to Show
```
From: Jennifer Martinez <jmartinez@techcorp.com>
Subject: Concerns about Q1 Implementation Timeline

Hi [Your Name],

I wanted to reach out regarding our Q1 implementation timeline.
Our team is concerned that the Feb 28 deadline may be too
aggressive given the recent technical issues we encountered
during testing.

We're committed to this partnership, but we want to ensure we
deliver quality rather than rush. Can we discuss adjusting the
timeline or adding more resources?

Best regards,
Jennifer
```

#### Sample Claude Draft to Show
```
DRAFT EMAIL GENERATED ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To: Jennifer Martinez <jmartinez@techcorp.com>
Subject: Re: Concerns about Q1 Implementation Timeline

Hi Jennifer,

Thank you for reaching out, and I appreciate your transparency about
the timeline concerns. Quality is absolutely our shared priority, and
I'm glad you raised this now rather than closer to the deadline.

The technical issues you encountered during testing are valid concerns,
and I want to make sure we address them properly rather than rushing
through them. Your team's commitment to delivering quality work is
exactly why our partnership is so strong.

I'd like to schedule a call next week to discuss this in detail. We can:
• Review the current timeline and identify pressure points
• Explore options for timeline adjustment or additional resources
• Ensure we're aligned on quality standards and deliverables

Are you available Tuesday or Wednesday afternoon next week? I'll have
our technical lead join us so we can address the testing issues directly.

Let's make sure we set this project up for success together.

Best regards,
[Your Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: Draft (pending review)
```

#### Production Notes
- 40 seconds
- Split screen: original email → draft response
- Highlight how Claude followed instructions (acknowledge, propose meeting, collaborative)
- Show draft status indicator

---

### Screen 6B: Refine Draft (4:40 - 5:10)

#### Visual
- Type: "Make the draft more direct and add a specific meeting time proposal"
- Show `update_draft` tool execution
- Display updated draft with changes highlighted

#### Narration
*"Want to adjust the tone? Simply tell Claude. It iterates on the draft conversationally, maintaining context while refining based on your feedback."*

#### On-Screen Text
```
User Input: "Make it more direct and add specific meeting time proposal"

Tool: update_draft ✓
Revising draft...
```

#### Sample Revised Draft to Show
```
DRAFT EMAIL UPDATED ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To: Jennifer Martinez <jmartinez@techcorp.com>
Subject: Re: Concerns about Q1 Implementation Timeline

Hi Jennifer,

Thanks for flagging the timeline concerns. You're absolutely right—
quality matters more than hitting an arbitrary deadline.

Let's discuss options for the timeline and resources. I'm proposing:

📅 Meeting: Tuesday, Feb 11 at 2:00 PM PST (1 hour)
👥 Attendees: You, me, and our technical lead

We'll cover:
1. Current timeline assessment and realistic adjustments
2. Technical issues from testing—root causes and solutions
3. Resource allocation options

Please confirm if this time works, or suggest an alternative.

Best regards,
[Your Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: Draft (pending review)
Changes: More direct, specific meeting proposal added ✓
```

#### Production Notes
- 30 seconds
- Highlight changes made (more direct language, specific time)
- Show diff/changes visually if possible
- Emphasize conversational iteration

---

### Screen 6C: Draft Management (5:10 - 5:30)

#### Visual
- Type: "Show me all my pending drafts"
- Show `list_drafts` tool execution
- Display list of all draft emails

#### Narration
*"Manage all your drafts in one place. Review, refine, and send when ready. Nothing gets lost or forgotten."*

#### On-Screen Text
```
User Input: "Show me all my pending drafts"

Tool: list_drafts ✓
```

#### Sample Output to Show
```
📧 Your Draft Emails (3 pending)

1. Re: Concerns about Q1 Implementation Timeline
   To: Jennifer Martinez (TechCorp)
   Status: Pending Review
   Created: Today, 11:30 AM
   Last Updated: Today, 11:45 AM

2. Follow-up: Partnership Expansion Proposal
   To: Sarah Chen (Partner Co)
   Status: Pending Review
   Created: Yesterday, 3:20 PM

3. Team Update: Q1 Priorities
   To: Direct Reports (6 recipients)
   Status: Pending Review
   Created: Yesterday, 5:00 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to send? Say "send draft [#]" or "review draft [#]"
```

#### Production Notes
- 20 seconds
- Show clean list interface
- Emphasize organization and control

---

## Scene 7: Advanced Feature - Autonomous Agent (5:30 - 6:30)

### Screen 7A: Agent Settings (5:30 - 6:00)

#### Visual
- Type: "Show my agent settings"
- Show `get_agent_settings` tool execution
- Display agent configuration panel

#### Narration
*"EmailApp can also work autonomously. Configure the agent to automatically process new emails, extract tasks, and generate drafts in the background—while you focus on strategic work."*

#### On-Screen Text
```
User Input: "Show my agent settings"

Tool: get_agent_settings ✓
```

#### Sample Output to Show
```
🤖 Agent Configuration

AUTOMATION SETTINGS:
✅ Auto Process Emails: Enabled
   → Fetch and analyze new emails every 15 minutes

✅ Auto Extract Tasks: Enabled
   → Automatically create tasks from actionable emails

✅ Auto Generate Drafts: Enabled
   → Create draft responses for common email types

✅ Auto Extract Meetings: Enabled
   → Parse calendar invites and prepare meeting context

🔒 APPROVAL SETTINGS:
✅ Require Approval Before Sending: Enabled (recommended)
✅ Notify on High Priority Tasks: Enabled

⏱️ CHECK INTERVAL: Every 15 minutes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You maintain full control. Claude assists, you approve.
```

#### Production Notes
- 30 seconds
- Show toggle switches for each setting
- Emphasize "you approve" safety

---

### Screen 7B: Run Agent Now (6:00 - 6:30)

#### Visual
- Type: "Run the agent now and process all my unread emails"
- Show `run_agent_now` tool execution with loading animation
- Display agent activity summary

#### Narration
*"Watch as the agent processes your entire inbox in one command. Tasks extracted, drafts generated, meetings prepared. This is what 'zero inbox' actually looks like with AI assistance."*

#### On-Screen Text
```
User Input: "Run the agent now and process all unread emails"

Tool: run_agent_now ✓

🤖 Agent Running...
⏳ Processing unread emails...
```

#### Sample Output to Show
```
🤖 Agent Run Complete ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ACTIVITY SUMMARY

📧 Emails Processed: 23 unread emails
   ⚠️  High Priority: 4 emails
   🔷  Medium Priority: 12 emails
   🟢  Low Priority: 7 emails

✅ Tasks Extracted: 8 new tasks
   ⚠️  High Priority: 2 tasks
   🔷  Medium Priority: 4 tasks
   🟢  Low Priority: 2 tasks

📝 Drafts Generated: 3 draft responses
   • Response to client inquiry (TechCorp)
   • Meeting confirmation (Board Review)
   • Team update acknowledgment

📅 Meetings Identified: 2 new meetings
   • Q2 Planning Session (Feb 15)
   • Client Check-in (Feb 18)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️ Time Saved: ~45 minutes
📬 Inbox Status: Zero unread requiring immediate action

All drafts are pending your review before sending.
```

#### Production Notes
- 30 seconds
- Show loading animation/progress
- Animate numbers counting up
- Big reveal of time saved

---

## Scene 8: Value Proposition & ROI (6:30 - 7:30)

### Visual
- Infographic-style screen showing statistics
- Clean background with key metrics appearing
- Can use simple animations or static visuals

### Narration
*"Let's talk about value. Most executives save five to ten hours per week on email management and meeting preparation. That's 250 to 500 hours annually—over twelve weeks of work time back in your calendar.

If your time is worth two hundred dollars per hour, that's thirty-nine thousand to one hundred fifty-six thousand dollars in value every year. And that's just time savings—it doesn't account for better decision-making from being more prepared, or reduced stress from a managed inbox.

EmailApp integrates seamlessly with your existing Microsoft 365 infrastructure. It uses OAuth authentication—we never store your password. All communication happens through Microsoft's official Graph API with enterprise-grade security. You maintain full control through approval workflows, and there's a complete audit trail of every action Claude takes on your behalf."*

### On-Screen Text & Infographics
```
⏱️ TIME SAVINGS
5-10 hours per week
= 250-500 hours annually
= 12+ weeks of work time

💰 VALUE CALCULATION
$200/hour × 250 hours = $39,000/year
$300/hour × 500 hours = $156,000/year

🔒 SECURITY
✓ Microsoft OAuth (no passwords stored)
✓ Official Graph API
✓ Enterprise-grade encryption
✓ Full approval workflows
✓ Complete audit trail
✓ You maintain control

🎯 BENEFITS
✓ Zero inbox
✓ Nothing falls through cracks
✓ Walk into meetings prepared
✓ High-quality responses in seconds
✓ Reduced stress, increased focus
```

### Production Notes
- 60 seconds
- Clean, professional infographic style
- Animate numbers and checkmarks appearing
- Use charts/graphs if possible
- Build trust with security emphasis

---

## Scene 9: Call to Action (7:30 - 8:00)

### Visual
- Return to Claude Desktop with EmailApp running
- Show all three pillars briefly (quick montage)
- Transition to final screen with contact info

### Narration
*"EmailApp transforms Claude into your intelligent executive assistant. It handles the cognitive overhead of email management so you can focus on what matters most—strategic decisions that move your business forward.

Ready to get started? Visit the link below to set up EmailApp with your Microsoft Outlook account. Experience the power of AI-assisted email management in your own inbox."*

### On-Screen Text
```
🚀 Get Started with EmailApp

✓ Seamless Microsoft Outlook integration
✓ 2-minute setup
✓ Free and open-source

📚 Documentation & Setup:
github.com/[your-repo]/emailapp

📧 Questions?
[support email]

Transform your inbox today.
```

### Production Notes
- 30 seconds
- Show quick montage of key features
- Clear call-to-action
- Professional closing

---

## Scene 10: End Card (8:00 - 8:10)

### Visual
- Clean end screen with EmailApp branding
- Social media links
- Documentation links

### Narration
*[Optional soft music, no voiceover or:]*
*"EmailApp. AI-powered email management for Microsoft Outlook."*

### On-Screen Text
```
EmailApp

🌐 github.com/[your-repo]
📧 support@emailapp.com
🐦 @emailapp

Built with Claude & MCP
```

### Production Notes
- 10 seconds
- Fade to black
- Music fade out
- Professional closing

---

## PRODUCTION CHECKLIST

### Pre-Production
- [ ] Set up clean Outlook test account with sample data
- [ ] Prepare all sample emails, meetings, tasks
- [ ] Test all MCP tools work smoothly
- [ ] Clear Claude Desktop conversation history
- [ ] Set screen resolution to 1920x1080
- [ ] Close unnecessary applications
- [ ] Disable notifications

### Recording Equipment
- [ ] Screen recording software installed (OBS/Camtasia/Loom)
- [ ] Microphone tested and quality-checked
- [ ] Quiet recording environment
- [ ] Script printed or on second monitor

### During Recording
- [ ] Record in 1920x1080 resolution minimum
- [ ] Use consistent window sizes
- [ ] Type at natural pace (not too fast)
- [ ] Pause between scenes for easier editing
- [ ] Record voiceover separately from screen (easier to edit)
- [ ] Do multiple takes of key scenes

### Post-Production
- [ ] Add background music (subtle, professional)
- [ ] Color correct for consistency
- [ ] Add text overlays and annotations
- [ ] Add transitions between scenes (smooth, not distracting)
- [ ] Sync voiceover with visuals
- [ ] Add captions/subtitles (accessibility + silent viewing)
- [ ] Export in multiple formats (1080p, 720p, 4K if needed)

---

## SCREEN RECORDING TIPS

### Window Setup
- Use full-screen or consistent window sizes
- Keep Claude Desktop on left, Outlook preview on right when showing both
- Zoom in on text when showing specific details
- Hide unnecessary UI elements

### Typing Demonstration
- Type at moderate speed (not too fast)
- Use real typing, not pasted text (more authentic)
- Pause briefly after pressing Enter before showing results

### Tool Execution
- Allow 2-3 seconds for tool to execute
- Show loading states if available
- Transition smoothly to results

### Text Visibility
- Use large, readable fonts (14pt minimum)
- Ensure high contrast
- Zoom in on important text
- Use highlights or callouts for emphasis

---

## VIDEO FORMATS & EXPORT SETTINGS

### Primary Format (YouTube/Web)
- Resolution: 1920x1080 (1080p)
- Frame rate: 30fps or 60fps
- Bitrate: 8-10 Mbps
- Format: MP4 (H.264)

### Secondary Format (Social Media)
- Resolution: 1280x720 (720p)
- Frame rate: 30fps
- Bitrate: 5 Mbps
- Format: MP4 (H.264)

### Short Clip Versions
- Create 60-second highlight reel
- Create 30-second teaser
- Format: 1080x1920 (vertical for mobile)

---

## VOICEOVER SCRIPT TIMING GUIDE

| Scene | Duration | Words | Speaking Pace |
|-------|----------|-------|---------------|
| Scene 1 | 8 sec | 10 | Slow |
| Scene 2 | 22 sec | 55 | Medium |
| Scene 3 | 20 sec | 50 | Medium |
| Scene 4A | 20 sec | 40 | Medium |
| Scene 4B | 40 sec | 70 | Medium |
| Scene 4C | 40 sec | 40 | Slow (emphasize) |
| Scene 5A | 30 sec | 50 | Medium |
| Scene 5B | 60 sec | 80 | Slow (detailed) |
| Scene 6A | 40 sec | 65 | Medium |
| Scene 6B | 30 sec | 40 | Medium |
| Scene 6C | 20 sec | 25 | Medium |
| Scene 7A | 30 sec | 45 | Medium |
| Scene 7B | 30 sec | 40 | Medium-Fast |
| Scene 8 | 60 sec | 120 | Slow (important) |
| Scene 9 | 30 sec | 55 | Medium |
| Scene 10 | 10 sec | 10 | Slow |

**Total**: ~490 seconds (8:10 minutes) | ~795 words

---

## MUSIC SUGGESTIONS

### Background Music Style
- Professional, upbeat but not distracting
- Instrumental only (no lyrics)
- Consistent throughout video
- Lower volume during narration (-20dB to -25dB)

### Recommended Tracks (Royalty-Free)
- "Corporate Success" type tracks
- "Technology Innovation" genre
- "Professional Presentation" style

### Sources for Royalty-Free Music
- Epidemic Sound
- Artlist
- YouTube Audio Library (free)
- Bensound (free with attribution)

---

## THUMBNAIL DESIGN (For YouTube)

### Layout
```
┌─────────────────────────────────────┐
│                                     │
│   [EmailApp Logo]                   │
│                                     │
│   Transform Claude into             │
│   Your Executive Assistant          │
│                                     │
│   [Screenshot of Claude + Outlook]  │
│                                     │
│   ⏱️ Save 5-10 Hours/Week            │
│                                     │
└─────────────────────────────────────┘
```

### Design Elements
- High contrast text
- Clear, large fonts (readable on mobile)
- Compelling screenshot or visual
- Include key benefit (time savings)
- Professional color scheme

---

*Video Script Complete - Ready for Production*
*Last Updated: 2026-02-09*
*Total Duration: 8-10 minutes*
