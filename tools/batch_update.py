#!/usr/bin/env python3
"""
Batch update script for DevToolBox HTML files
Adds shared CSS/JS imports, README button, and modal to all tools
"""

import re
from pathlib import Path

# Tools that need updates (excluding Flexbox and Grid which are done)
TOOLS = [
    "tools/frontend/dom-manipulation/event-inspector/index.html",
    "tools/frontend/window-management/window-open-tester/index.html",
    "tools/frontend/network-inspectors/cors-tester/index.html",
    "tools/frontend/storage-explorers/localstorage-manager/index.html",
    "tools/frontend/text-processing/regex-tester/index.html",
    "tools/frontend/text-processing/markdown-previewer/index.html",
    "tools/frontend/text-processing/base64-tool/index.html",
    "tools/frontend/text-processing/json-formatter/index.html",
    "tools/frontend/security/jwt-debugger/index.html",
]

# Shared imports to add after Tailwind
SHARED_IMPORTS = '''    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <link rel="stylesheet" href="../../shared/styles.css">
    <script src="../../shared/utils.js" defer></script>'''

# README button HTML
README_BUTTON = '''            <button id="readme-btn"
                class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                README
            </button>'''

# Modal HTML
MODAL_HTML = '''
    <!-- README Modal -->
    <div id="readme-modal" class="modal-overlay fixed inset-0 hidden flex items-center justify-center z-50">
        <div class="modal-content w-[800px] h-[600px] rounded-lg flex flex-col">
            <div class="flex justify-between items-center p-4 border-b border-slate-700 shrink-0">
                <h2 class="text-xl font-bold text-white">Documentation</h2>
                <button id="close-modal"
                    class="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div id="readme-content" class="flex-1 overflow-auto p-6 markdown-body">
                Loading...
            </div>
        </div>
    </div>'''

def update_tool(filepath):
    """Update a single tool HTML file"""
    print(f"Updating {filepath}...")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Add shared imports after Tailwind CDN
    if '../../shared/styles.css' not in content:
        content = re.sub(
            r'(<script src="https://cdn\.tailwindcss\.com"></script>)',
            r'\1\n' + SHARED_IMPORTS,
            content
        )
    
    # 2. Add README button to header (find first button in header and add before it)
    if 'id="readme-btn"' not in content:
        # Find header section and add README button
        content = re.sub(
            r'(<header[^>]*>.*?<div class="flex gap-2">)',
            r'\1\n' + README_BUTTON,
            content,
            flags=re.DOTALL
        )
    
    # 3. Add modal before </body>
    if 'id="readme-modal"' not in content:
        content = content.replace('</body>', MODAL_HTML + '\n</body>')
    
    # 4. Remove duplicate scrollbar styles (now in shared CSS)
    content = re.sub(
        r'/\* Custom Scrollbars \*/.*?::-webkit-scrollbar-thumb:hover \{[^}]+\}\s*',
        '',
        content,
        flags=re.DOTALL
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✓ Updated {filepath}")

def main():
    base_path = Path("/Users/omi/testpad")
    
    for tool in TOOLS:
        filepath = base_path / tool
        if filepath.exists():
            update_tool(filepath)
        else:
            print(f"✗ Not found: {filepath}")
    
    print("\n✅ All tools updated!")

if __name__ == "__main__":
    main()
