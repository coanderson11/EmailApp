/**
 * PDF Generator for Storyboard
 * Converts storyboard.html to PDF using Puppeteer
 */

const fs = require('fs');
const path = require('path');

// Check if puppeteer is installed
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (err) {
  console.error('❌ Puppeteer not installed.');
  console.log('\n📦 Installing puppeteer...');
  console.log('Run: npm install puppeteer');
  console.log('\nOr use your browser to print to PDF:');
  console.log('1. Open storyboard.html in your browser');
  console.log('2. Press Ctrl+P (or Cmd+P)');
  console.log('3. Select "Save as PDF"');
  console.log('4. Click "Save"');
  process.exit(1);
}

async function generatePDF() {
  console.log('🎬 Generating PDF from storyboard.html with Puppeteer...\n');

  const htmlPath = path.join(__dirname, 'storyboard.html');
  const pdfPath = path.join(__dirname, 'storyboard.pdf');

  // Check if HTML file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ storyboard.html not found!');
    console.log('Run: node generate-storyboard.js first');
    process.exit(1);
  }

  try {
    // Launch headless browser
    console.log('🚀 Launching headless browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2 // Higher resolution for better quality
    });

    // Load the HTML file
    console.log('📄 Loading storyboard.html...');
    const htmlUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    await page.goto(htmlUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for any animations or fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate PDF with optimized settings
    console.log('🖨️  Generating high-quality PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'Letter',
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
      },
      // Better page breaks
      pageRanges: '',
      scale: 1.0
    });

    await browser.close();

    const fileSize = fs.statSync(pdfPath).size;
    const fileSizeKB = (fileSize / 1024).toFixed(2);
    const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);

    console.log('✅ PDF generated successfully with Puppeteer!');
    console.log(`📄 Output file: ${pdfPath}`);
    console.log(`📊 File size: ${fileSizeMB} MB (${fileSizeKB} KB)`);
    console.log('🎨 High-resolution rendering enabled for better quality');
    console.log('\n🎉 Ready for printing and reference!');

  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    console.log('\n💡 Alternative: Use your browser to print to PDF:');
    console.log('   1. Open storyboard.html in your browser');
    console.log('   2. Press Ctrl+P (or Cmd+P)');
    console.log('   3. Select "Save as PDF"');
    console.log('   4. Click "Save"');
    process.exit(1);
  }
}

generatePDF();
