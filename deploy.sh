#!/bin/bash

echo "🔨 Building Federal Policy 24..."
cd ~/FLIP
npm run build

echo "📦 Creating archive..."
tar -czf dist.tar.gz dist/

echo "📤 Uploading to hosting..."
# Using curl to upload via FTP
curl -T dist.tar.gz ftp://if0_42149933:YOUR_PASSWORD@185.27.134.225/public_html/ 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Upload successful!"
    echo ""
    echo "🌐 Your site is live at: https://federalpolicy.site.je"
    echo ""
    echo "Next: Login to your hosting panel and extract dist.tar.gz"
    echo "Control panel: https://federalpolicy.site.je:2222"
else
    echo "❌ Upload failed. Upload manually:"
    echo "1. Open: https://federalpolicy.site.je:2222"
    echo "2. Login: if0_42149933"
    echo "3. File Manager → public_html → Upload dist.tar.gz → Extract"
fi
