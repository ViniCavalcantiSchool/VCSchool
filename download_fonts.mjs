import fs from 'fs';
import https from 'https';
import path from 'path';

const fontsDir = path.join(process.cwd(), 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

function fetch(url, options) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
  
  const interCss = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap", { headers: { "User-Agent": ua } });
  const outfitCss = await fetch("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap", { headers: { "User-Agent": ua } });

  const processCss = async (css, name) => {
    // Only keeping latin subset to simplify based on user instructions
    const blocks = css.split('/* ');
    let fontsCssContent = '';
    
    for (let weight of [400, 500, 600, 700]) {
      const urlRegex = new RegExp(`font-weight: ${weight};\\s*font-style: normal;\\s*[^]*?src: url\\((https:\\/\\/[^)]+)\\)`);
      
      // Let's first extract the latin part
      let latinPart = css.substring(css.indexOf(`/* latin */\n@font-face {\n  font-family: '${name}';\n  font-style: normal;\n  font-weight: ${weight};`));
      latinPart = latinPart.substring(0, latinPart.indexOf('}')) + '}';
      
      const match = latinPart.match(/src: url\((https:\/\/[^)]+)\)/);
      if (match) {
        const fontUrl = match[1];
        const filename = `${name.toLowerCase()}-${weight}.woff2`;
        const dest = path.join(fontsDir, filename);
        console.log(`Downloading ${fontUrl} to ${dest}`);
        await downloadFile(fontUrl, dest);
        
        fontsCssContent += `@font-face {\n  font-family: '${name}';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('/fonts/${filename}') format('woff2');\n}\n`;
      }
    }
    return fontsCssContent;
  };

  const interFontsCss = await processCss(interCss, 'Inter');
  const outfitFontsCss = await processCss(outfitCss, 'Outfit');

  fs.writeFileSync(path.join(fontsDir, 'fonts.css'), interFontsCss + outfitFontsCss);
  console.log("Done");
}

main().catch(console.error);
