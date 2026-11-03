#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

rm -rf dist
mkdir -p dist

cp index.html robots.txt sitemap.xml og-social-card.jpg share-widget.css dist/
cp -R img services dist/
mkdir -p dist/scripts
cp scripts/share-widget.js dist/scripts/
