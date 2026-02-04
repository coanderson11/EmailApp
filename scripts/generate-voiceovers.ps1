# ElevenLabs Voiceover Generator Script
# Generates all 16 EmailApp demo voiceovers automatically
# Requirements: PowerShell 5.0+, ElevenLabs API key

# ============================================================================
# CONFIGURATION
# ============================================================================

# Set your ElevenLabs API Key here
$API_KEY = "your_elevenlabs_api_key_here"

# Output directory
$OUTPUT_DIR = "C:\Users\coander\myprojects\EmailApp\voiceovers"

# Voice ID (Rachel - professional female voice)
$VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # Rachel voice
# Alternative voices:
# - Bella: "EXAVITQu4vr4xnSDxMaL"
# - Antoni: "ErXwobaYp0GZH7q1dL4Xl"
# - Arnold: "VR6AewLHbuNelWp34dVz"

# ============================================================================
# SCENE DATA (TEXT, SPEAKING RATE, DURATION)
# ============================================================================

$SCENES = @(
    @{
        number = "1"
        name = "Title_Card"
        text = "EmailApp: AI-powered email and task management for Microsoft Outlook."
        rate = 0.95  # -5%
    },
    @{
        number = "2"
        name = "The_Problem"
        text = "As an executive, your inbox is overwhelming. Fifty new emails overnight. Back-to-back meetings with no time to prepare. Action items buried in email threads. And hours spent writing responses instead of making strategic decisions."
        rate = 1.0  # 0%
    },
    @{
        number = "3"
        name = "The_Solution_Introduction"
        text = "What if Claude could handle all of that for you? Through the Model Context Protocol, EmailApp gives Claude direct access to your Microsoft Outlook. It processes emails, extracts tasks, prepares you for meetings, and drafts responses—automatically."
        rate = 0.95  # -5%
    },
    @{
        number = "4A"
        name = "Fetch_Emails"
        text = "Let's start with Monday morning. Instead of manually triaging fifty emails, just ask Claude. It fetches your emails through Microsoft Graph API and instantly provides a structured summary."
        rate = 0.95  # -5%
    },
    @{
        number = "4B"
        name = "Extract_Tasks"
        text = "This email from the CFO contains multiple action items. Instead of manually creating tasks, Claude automatically extracts them, assigns priorities, and sets due dates based on context."
        rate = 0.95  # -5%
    },
    @{
        number = "4C"
        name = "Task_Dashboard"
        text = "You now have a real-time dashboard of what matters most. Nothing falls through the cracks. Every action item is tracked and prioritized."
        rate = 0.90  # -10%
    },
    @{
        number = "5A"
        name = "Extract_Meeting_Info"
        text = "You have a meeting in thirty minutes with a key partner. Claude automatically extracts meeting details from calendar invites—attendees, agenda, location, and objectives."
        rate = 0.95  # -5%
    },
    @{
        number = "5B"
        name = "Generate_Meeting_Prep"
        text = "Now here's where it gets powerful. Claude prepares you for this meeting by searching your entire email history with these attendees, identifying relevant context, and generating a comprehensive briefing document. You walk in fully prepared in minutes, not hours."
        rate = 0.90  # -10%
    },
    @{
        number = "6A"
        name = "Generate_Draft"
        text = "You receive an important email that requires a thoughtful response, but you're between meetings. Instead of context-switching, ask Claude to draft it for you. It analyzes the original email, follows your instructions, and generates a professional response in seconds."
        rate = 0.95  # -5%
    },
    @{
        number = "6B"
        name = "Refine_Draft"
        text = "Want to adjust the tone? Simply tell Claude. It iterates on the draft conversationally, maintaining context while refining based on your feedback."
        rate = 0.95  # -5%
    },
    @{
        number = "6C"
        name = "Draft_Management"
        text = "Manage all your drafts in one place. Review, refine, and send when ready. Nothing gets lost or forgotten."
        rate = 0.95  # -5%
    },
    @{
        number = "7A"
        name = "Agent_Settings"
        text = "EmailApp can also work autonomously. Configure the agent to automatically process new emails, extract tasks, and generate drafts in the background—while you focus on strategic work."
        rate = 0.95  # -5%
    },
    @{
        number = "7B"
        name = "Run_Agent_Now"
        text = "Watch as the agent processes your entire inbox in one command. Tasks extracted, drafts generated, meetings prepared. This is what 'zero inbox' actually looks like with AI assistance."
        rate = 1.0  # 0%
    },
    @{
        number = "8"
        name = "Value_Proposition_ROI"
        text = "Let's talk about value. Most executives save five to ten hours per week on email management and meeting preparation. That's 250 to 500 hours annually—over twelve weeks of work time back in your calendar. If your time is worth two hundred dollars per hour, that's thirty-nine thousand to one hundred fifty-six thousand dollars in value every year. And that's just time savings—it doesn't account for better decision-making from being more prepared, or reduced stress from a managed inbox. EmailApp integrates seamlessly with your existing Microsoft 365 infrastructure. It uses OAuth authentication—we never store your password. All communication happens through Microsoft's official Graph API with enterprise-grade security. You maintain full control through approval workflows, and there's a complete audit trail of every action Claude takes on your behalf."
        rate = 0.85  # -15%
    },
    @{
        number = "9"
        name = "Call_to_Action"
        text = "EmailApp transforms Claude into your intelligent executive assistant. It handles the cognitive overhead of email management so you can focus on what matters most—strategic decisions that move your business forward. Ready to get started? Visit the link below to set up EmailApp with your Microsoft Outlook account. Experience the power of AI-assisted email management in your own inbox."
        rate = 0.95  # -5%
    },
    @{
        number = "10"
        name = "End_Card"
        text = "EmailApp. AI-powered email management for Microsoft Outlook."
        rate = 0.85  # -15%
    }
)

# ============================================================================
# VALIDATION
# ============================================================================

if ($API_KEY -eq "your_elevenlabs_api_key_here") {
    Write-Host "❌ ERROR: API key not set!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please edit this script and replace:" -ForegroundColor Yellow
    Write-Host '  $API_KEY = "your_elevenlabs_api_key_here"' -ForegroundColor Gray
    Write-Host "with your actual ElevenLabs API key from: https://elevenlabs.io/app/profile/api-keys" -ForegroundColor Yellow
    exit 1
}

# Create output directory if it doesn't exist
if (!(Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
    Write-Host "✓ Created output directory: $OUTPUT_DIR" -ForegroundColor Green
}

# ============================================================================
# FUNCTIONS
# ============================================================================

function Generate-Voiceover {
    param(
        [string]$SceneNumber,
        [string]$SceneName,
        [string]$Text,
        [double]$SpeakingRate
    )

    $filename = "scene_${SceneNumber}_${SceneName}.mp3"
    $filepath = Join-Path $OUTPUT_DIR $filename

    Write-Host ""
    Write-Host "Generating: $filename" -ForegroundColor Cyan
    Write-Host "  Speaking Rate: $SpeakingRate" -ForegroundColor Gray
    Write-Host "  Characters: $($Text.Length)" -ForegroundColor Gray

    $uri = "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID"

    $body = @{
        text = $Text
        model_id = "eleven_monolingual_v1"
        voice_settings = @{
            stability = 0.5
            similarity_boost = 0.75
        }
        language_code = "en-US"
    } | ConvertTo-Json

    # Add XI-API-Key header for authentication
    $headers = @{
        "XI-API-Key" = $API_KEY
        "Content-Type" = "application/json"
    }

    try {
        # Make API request
        $response = Invoke-WebRequest `
            -Uri $uri `
            -Method POST `
            -Headers $headers `
            -Body $body `
            -OutFile $filepath `
            -TimeoutSec 60

        # Verify file was created
        if (Test-Path $filepath) {
            $filesize = (Get-Item $filepath).Length
            $filesizeMB = [math]::Round($filesize / 1MB, 2)
            Write-Host "  ✓ Generated: $filepath ($($filesizeMB) MB)" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ✗ File not created" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EmailApp Demo Voiceover Generator" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Output Directory: $OUTPUT_DIR" -ForegroundColor Gray
Write-Host "Voice: Rachel (Professional Female)" -ForegroundColor Gray
Write-Host "Total Scenes: $($SCENES.Count)" -ForegroundColor Gray
Write-Host ""
Write-Host "Generating voiceovers..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0
$startTime = Get-Date

foreach ($scene in $SCENES) {
    $success = Generate-Voiceover `
        -SceneNumber $scene.number `
        -SceneName $scene.name `
        -Text $scene.text `
        -SpeakingRate $scene.rate

    if ($success) {
        $successCount++
    } else {
        $failCount++
    }

    # Add small delay between API calls to prevent rate limiting
    if ($scene -ne $SCENES[-1]) {
        Start-Sleep -Milliseconds 500
    }
}

$endTime = Get-Date
$duration = ($endTime - $startTime).TotalSeconds

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Generation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Results:" -ForegroundColor Yellow
Write-Host "  ✓ Successful: $successCount" -ForegroundColor Green
Write-Host "  ✗ Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host "  ⏱ Time: $([math]::Round($duration, 2)) seconds" -ForegroundColor Gray
Write-Host ""
Write-Host "Output Directory:" -ForegroundColor Yellow
Write-Host "  $OUTPUT_DIR" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Listen to the generated MP3 files" -ForegroundColor Gray
Write-Host "  2. Import into video editor (DaVinci Resolve, Premiere, etc.)" -ForegroundColor Gray
Write-Host "  3. Sync with screen recordings from VIDEO_SCRIPT.md" -ForegroundColor Gray
Write-Host "  4. Export final demo video" -ForegroundColor Gray
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✓ All voiceovers generated successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠ Some voiceovers failed. Check your API key and try again." -ForegroundColor Yellow
}
