# Generate PDF from storyboard.html using Microsoft Edge
Write-Host "Generating PDF from storyboard.html..." -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlFile = Join-Path $scriptPath "storyboard.html"
$pdfFile = Join-Path $scriptPath "storyboard.pdf"

# Check if HTML file exists
if (-not (Test-Path $htmlFile)) {
    Write-Host "ERROR: storyboard.html not found!" -ForegroundColor Red
    Write-Host "Run: node generate-storyboard.js first" -ForegroundColor Yellow
    exit 1
}

# Find Microsoft Edge
$edgePaths = @(
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
    "${env:LOCALAPPDATA}\Microsoft\Edge\Application\msedge.exe"
)

$edgePath = $null
foreach ($path in $edgePaths) {
    if (Test-Path $path) {
        $edgePath = $path
        break
    }
}

if (-not $edgePath) {
    Write-Host "ERROR: Microsoft Edge not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Open storyboard.html in your browser and:" -ForegroundColor Yellow
    Write-Host "   1. Press Ctrl+P" -ForegroundColor Yellow
    Write-Host "   2. Select Save as PDF" -ForegroundColor Yellow
    Write-Host "   3. Click Save" -ForegroundColor Yellow
    exit 1
}

Write-Host "Using Microsoft Edge to generate PDF..." -ForegroundColor Green

# Convert to file:/// URL
$htmlUrl = "file:///$($htmlFile.Replace('\', '/'))"

# Generate PDF using Edge headless mode
$arguments = @(
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--print-to-pdf=`"$pdfFile`"",
    "--print-to-pdf-no-header",
    "`"$htmlUrl`""
)

try {
    $process = Start-Process -FilePath $edgePath -ArgumentList $arguments -Wait -PassThru -NoNewWindow

    if ($process.ExitCode -eq 0 -and (Test-Path $pdfFile)) {
        Write-Host "SUCCESS: PDF generated!" -ForegroundColor Green
        Write-Host "Output file: $pdfFile" -ForegroundColor Cyan

        $fileSize = (Get-Item $pdfFile).Length / 1KB
        Write-Host "File size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Ready for reference during video production!" -ForegroundColor Green
    } else {
        throw "PDF generation failed"
    }
} catch {
    Write-Host "ERROR: Could not generate PDF: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Open storyboard.html in your browser and:" -ForegroundColor Yellow
    Write-Host "   1. Press Ctrl+P" -ForegroundColor Yellow
    Write-Host "   2. Select Save as PDF" -ForegroundColor Yellow
    Write-Host "   3. Click Save" -ForegroundColor Yellow
    exit 1
}
