#!/bin/bash
# Clean restart script for Vite dev server

echo "Killing any existing node/vite processes..."
pkill -f "vite|node" 2>/dev/null || true
sleep 2

echo "Cleaning Vite cache..."
rm -rf node_modules/.vite 2>/dev/null || true

echo "Cleaning Vite temp files..."
rm -rf .vite 2>/dev/null || true

echo "Starting dev server..."
npm run dev
