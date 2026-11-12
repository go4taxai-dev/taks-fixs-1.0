const fs = require('fs');
const path = require('path');

const files = [
    'js/toast.js',
    'js/api.js',
    'js/mockApi.js', // Client-side mock API router
    'js/auth.js',
    'js/profile.js',
    'js/services.js',
    'js/chat.js',
    'js/users.js',
    'js/buddies.js',
    'js/requestDetails.js',
    'js/payouts.js',
    'js/outstanding.js',
    'js/taxPortal.js',
    'js/disputes.js',
    'js/feedback.js',
    'js/catalogManager.js',
    'js/dashboard.js',
    'js/app.js'
];

let bundleContent = '';

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File ${file} does not exist. Skipping...`);
        return;
    }
    
    console.log(`Packing ${file}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove imports
    content = content.replace(/^import\s+.*?;?$/gm, '');
    
    // Remove exports
    content = content.replace(/^export\s+const\s+/gm, 'const ');
    content = content.replace(/^export\s+class\s+/gm, 'class ');
    content = content.replace(/^export\s+async\s+function\s+/gm, 'async function ');
    content = content.replace(/^export\s+function\s+/gm, 'function ');
    
    bundleContent += `\n\n// === FILE: ${file} ===\n` + content;
});

// Instantiates the app at the very end
bundleContent += `\n\n// Start App\nif (window.isLocalFileMode) {\n    window.onload = () => {\n        window.TaxConnectApp = new App();\n    };\n}\n`;

const outputPath = path.join(__dirname, 'js/bundle.js');
fs.writeFileSync(outputPath, bundleContent, 'utf8');
console.log(`Bundle built successfully at ${outputPath}`);
