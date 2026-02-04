# Windows Built-in Text-to-Speech Voiceover Generator
# Uses System.Speech.Synthesis - No external dependencies!
# Completely local and free

# ============================================================================
# CONFIGURATION
# ============================================================================

$OUTPUT_DIR = "C:\Users\coander\myprojects\EmailApp\voiceovers"

# Windows TTS Voice - adjust if you have multiple voices installed
$VOICE_NAME = "Microsoft David Desktop"

# Speaking rate (-10 to +10, where 0 is normal)
$DEFAULT_RATE = 0

# ============================================================================
# SCENE DATA
# ============================================================================

$SCENES = @(
    @{
        number = "1"
        name = "Title_Card"
        text = "EmailApp: AI-powered email and task management for Microsoft Outlook."
        rate = -2
    },
    @{
        number = "2"
        name = "The_Problem"
        text = "As an executive, your inbox is overwhelming. Fifty new emails overnight. Back-to-back meetings with no time to prepare. Action items buried in email threads. And hours spent writing responses instead of making strategic decisions."
        rate = 0
    },
    @{
        number = "3"
        name = "The_Solution_Introduction"
        text = "What if Claude could handle all of that for you? Through the Model Context Protocol, EmailApp gives Claude direct access to your Microsoft Outlook. It processes emails, extracts tasks, prepares you for meetings, and drafts responses automatically."
        rate = -2
    },
    @{
        number = "4A"
        name = "Fetch_Emails"
        text = "Let's start with Monday morning. Instead of manually triaging fifty emails, just ask Claude. It fetches your emails through Microsoft Graph API and instantly provides a structured summary."
        rate = -2
    },
    @{
        number = "4B"
        name = "Extract_Tasks"
        text = "This email from the CFO contains multiple action items. Instead of manually creating tasks, Claude automatically extracts them, assigns priorities, and sets due dates based on context."
        rate = -2
    },
    @{
        number = "4C"
        name = "Task_Dashboard"
        text = "You now have a real-time dashboard of what matters most. Nothing falls through the cracks. Every action item is tracked and prioritized."
        rate = -3
    },
    @{
        number = "5A"
        name = "Extract_Meeting_Info"
        text = "You have a meeting in thirty minutes with a key partner. Claude automatically extracts meeting details from calendar invites: attendees, agenda, location, and objectives."
        rate = -2
    },
    @{
        number = "5B"
        name = "Generate_Meeting_Prep"
        text = "Now here's where it gets powerful. Claude prepares you for this meeting by searching your entire email history with these attendees, identifying relevant context, and generating a comprehensive briefing document. You walk in fully prepared in minutes, not hours."
        rate = -3
    },
    @{
        number = "6A"
        name = "Generate_Draft"
        text = "You receive an important email that requires a thoughtful response, but you're between meetings. Instead of context-switching, ask Claude to draft it for you. It analyzes the original email, follows your instructions, and generates a professional response in seconds."
        rate = -2
    },
    @{
        number = "6B"
        name = "Refine_Draft"
        text = "Want to adjust the tone? Simply tell Claude. It iterates on the draft conversationally, maintaining context while refining based on your feedback."
        rate = -2
    },
    @{
        number = "6C"
        name = "Draft_Management"
        text = "Manage all your drafts in one place. Review, refine, and send when ready. Nothing gets lost or forgotten."
        rate = -2
    },
    @{
        number = "7A"
        name = "Agent_Settings"
        text = "EmailApp can also work autonomously. Configure the agent to automatically process new emails, extract tasks, and generate drafts in the background while you focus on strategic work."
        rate = -2
    },
    @{
        number = "7B"
        name = "Run_Agent_Now"
        text = "Watch as the agent processes your entire inbox in one command. Tasks extracted, drafts generated, meetings prepared. This is what zero inbox actually looks like with AI assistance."
        rate = 0
    },
    @{
        number = "8"
        name = "Value_Proposition_ROI"
        text = "Let's talk about value. Most executives save five to ten hours per week on email management and meeting preparation. That's 250 to 500 hours annually over twelve weeks of work time back in your calendar. If your time is worth two hundred dollars per hour, that's thirty-nine thousand to one hundred fifty-six thousand dollars in value every year. And that's just time savings - it doesn't account for better decision-making from being more prepared, or reduced stress from a managed inbox. EmailApp integrates seamlessly with your existing Microsoft 365 infrastructure. It uses OAuth authentication - we never store your password. All communication happens through Microsoft's official Graph API with enterprise-grade security. You maintain full control through approval workflows, and there's a complete audit trail of every action Claude takes on your behalf."
        rate = -4
    },
    @{
        number = "9"
        name = "Call_to_Action"
        text = "EmailApp transforms Claude into your intelligent executive assistant. It handles the cognitive overhead of email management so you can focus on what matters most - strategic decisions that move your business forward. Ready to get started? Visit the link below to set up EmailApp with your Microsoft Outlook account. Experience the power of AI-assisted email management in your own inbox."
        rate = -2
    },
    @{
        number = "10"
        name = "End_Card"
        text = "EmailApp. AI-powered email management for Microsoft Outlook."
        rate = -4
    }
)

# ============================================================================
# SETUP
# ============================================================================

Add-Type -AssemblyName System.Speech

if (!(Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
}

Write-Host "Available voices on this system:" -ForegroundColor Gray
$synthesizer = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synthesizer.GetInstalledVoices() | ForEach-Object { Write-Host "  - $($_.VoiceInfo.Name)" -ForegroundColor Gray }

try {
    $synthesizer.SelectVoice($VOICE_NAME)
    Write-Host "Using voice: $VOICE_NAME" -ForegroundColor Green
} catch {
    Write-Host "Voice not found. Using default voice." -ForegroundColor Yellow
}

# ============================================================================
# FUNCTION
# ============================================================================

function Generate-Voiceover {
    param(
        [string]$SceneNumber,
        [string]$SceneName,
        [string]$Text,
        [int]$Rate
    )

    $filename = "scene_${SceneNumber}_${SceneName}.wav"
    $filepath = Join-Path $OUTPUT_DIR $filename

    try {
        $tempSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
        
        try {
            $tempSynth.SelectVoice($VOICE_NAME)
        } catch {
        }

        $tempSynth.Rate = $Rate
        $tempSynth.SetOutputToWaveFile($filepath)
        $tempSynth.Speak($Text)
        $tempSynth.Dispose()

        Start-Sleep -Milliseconds 100

        if (Test-Path $filepath) {
            $filesize = (Get-Item $filepath).Length
            if ($filesize -gt 0) {
                $sizeKB = [math]::Round($filesize / 1KB, 0)
                Write-Host "  OK $filename ($sizeKB KB)" -ForegroundColor Green
                return $true
            } else {
                Write-Host "  FAIL $filename (empty)" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "  FAIL $filename (not created)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  FAIL $filename : $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# ============================================================================
# MAIN
# ============================================================================

Write-Host ""
Write-Host "========================================"
Write-Host "Windows TTS Voiceover Generator"
Write-Host "========================================"
Write-Host ""
Write-Host "Voice: $VOICE_NAME" -ForegroundColor Gray
Write-Host "Output: $OUTPUT_DIR" -ForegroundColor Gray
Write-Host "Total Scenes: $($SCENES.Count)" -ForegroundColor Gray
Write-Host ""
Write-Host "Generating voiceovers..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0
$startTime = Get-Date

foreach ($scene in $SCENES) {
    Write-Host "Scene $($scene.number): $($scene.name)" -ForegroundColor Cyan

    $success = Generate-Voiceover `
        -SceneNumber $scene.number `
        -SceneName $scene.name `
        -Text $scene.text `
        -Rate $scene.rate

    if ($success) {
        $successCount++
    } else {
        $failCount++
    }
}

$endTime = Get-Date
$duration = ($endTime - $startTime).TotalSeconds

# ============================================================================
# RESULTS
# ============================================================================

Write-Host ""
Write-Host "========================================"
Write-Host "Generation Complete!"
Write-Host "========================================"
Write-Host ""
Write-Host "Results:" -ForegroundColor Yellow
Write-Host "  Successful: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor Yellow
Write-Host "  Time: $([math]::Round($duration, 2)) seconds" -ForegroundColor Gray
Write-Host ""
Write-Host "Output Directory:" -ForegroundColor Yellow
Write-Host "  $OUTPUT_DIR" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Review generated WAV files"
Write-Host "  2. Convert WAV to MP3 if needed"
Write-Host "  3. Import audio into video editor"
Write-Host "  4. Sync with screen recordings"
Write-Host "  5. Export final video"
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "Success! All voiceovers generated." -ForegroundColor Green
} else {
    Write-Host "Some voiceovers failed. Check output above." -ForegroundColor Yellow
}

Write-Host ""
