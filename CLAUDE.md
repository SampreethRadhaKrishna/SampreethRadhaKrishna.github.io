# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Sampreeth Radha Krishna, a Robotics Engineer. It's built using the "Read Only" template by HTML5 UP (html5up.net).

## Architecture

- **Single-page static website**: All content is in `index.html` with embedded styles
- **Assets**: CSS, JavaScript, and images are in subdirectories under `assets/` and `images/`
- **Template**: Based on Read Only template (read-only.html5up.net)
- **Current CSS**: Uses Lato and Source Code Pro fonts from Google Fonts
- **JavaScript**: jQuery-based with Scrollex, Scrolly, and browser detection utilities

## Important Notes

### Image Path Issues
The HTML uses Windows-style backslashes (`\`) in image paths (e.g., `images\profpic.jpg`). These should be converted to forward slashes (`images/profpic.jpg`) for proper web compatibility.

### Pending Redesign Requirements
The website is being redesigned with the following requirements (see `prompt.txt`):
- **Theme**: "Dark and Electric Purple" (#B026FF, #8A2BE2) on Deep Obsidian (#05050A) background
- **Style**: Edgy, industrial, robotic control interface aesthetic
- **Typography**: Monospaced fonts (JetBrains Mono/Fira Code) for headers, geometric sans-serif for body
- **Components**: Brutalist buttons with sharp corners, glassmorphism containers, HUD-style navigation
- **Framework**: Convert to Tailwind CSS with component-based architecture for extensibility
- **Features**: Telemetry dashboards, terminal-style loading states, modular design system

### Template Sections
- **Header**: Name, title, navigation, social icons
- **Section #one**: Introduction with hero image
- **Section #two**: Education (Case Western Reserve University, RNS Institute of Technology)
- **Section #three**: Work experience (Accenture, Bosch Rexroth)
- **Section #four**: Projects (ArmCam, Pick and Place Robot, ADAS Collision Detection, Fire Extinguishing Robot)

### Social Links
The LinkedIn and GitHub links use `#` placeholders and need proper URL formatting.

## Development

To make changes:
1. Edit `index.html` directly (no build step required)
2. Update images in `images/` or `assets/` as needed
3. Test locally by opening `index.html` in a browser
