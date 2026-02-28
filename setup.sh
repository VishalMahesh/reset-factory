#!/bin/bash

# Setup script for Reset Factory
# Run with: bash setup.sh

echo "🚀 Reset Factory - Setup Script"
echo "================================"
echo ""

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"
echo ""

# Check npm
echo "Checking npm..."
NPM_VERSION=$(npm -v)
echo "✅ npm $NPM_VERSION found"
echo ""

# Install dependencies
echo "Installing dependencies..."
echo "This may take 2-3 minutes..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation successful!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run dev"
    echo "2. The app window will open automatically"
    echo "3. Select a model and click Start to test"
    echo ""
    echo "Happy coding! 🎉"
else
    echo ""
    echo "❌ Installation failed!"
    echo "Try running: npm install --verbose"
    exit 1
fi
