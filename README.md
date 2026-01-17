# BIT Repository - PDF Viewer

A modern, responsive web-based PDF viewer for Bachelor of Information Technology (BIT) course materials.

**Version:** 2.2.0

## Features

- 📚 **Auto-updating File Organization**: Automatically detects and displays new folders and PDFs added to the repository
- 📱 **Mobile Responsive**: Optimized for all devices with proper touch targets and responsive design
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🔍 **Search**: Quickly find PDFs by name with search in both hero section and sidebar
- ⭐ **Favorites**: Mark frequently accessed PDFs
- 📖 **Smart PDF Rendering**: Uses native PDF viewer on desktop, PDF.js canvas rendering on mobile
- 🎨 **Modern UI/UX**: Clean interface following best practices for accessibility and usability
- 📲 **Progressive Web App (PWA)**: Install as a native app on mobile and desktop
- 🔒 **Enterprise Security**: Content Security Policy, XSS prevention, secure DOM manipulation
- ⚡ **Offline Support**: Service Worker provides caching and offline access to viewed PDFs
- 📊 **Statistics Dashboard**: View file count, subjects, and favorites statistics on the homepage
- ℹ️ **About & Contact**: Dedicated modals for information, terms of use, and contact/feedback options
- 🔗 **Quick Access Links**: Fast navigation to subjects directly from the homepage
- 📋 **Share Functionality**: Copy PDF links to clipboard for easy sharing

## Auto-Update Feature

The website automatically updates when new PDF files or folders are added to the repository:

### How It Works

1. **File Structure Generation**: The `generate-file-list.js` script scans the repository for PDF files and generates a `files.json` file
2. **GitHub Action**: A workflow (`.github/workflows/update-file-list.yml`) automatically runs when:
   - New PDF files are added
   - Changes are pushed to `BIT Project/` or `Semester 5/` folders
   - Manually triggered via workflow dispatch
3. **Dynamic Loading**: The webpage loads the file structure from `files.json` at runtime

### Manual Update

To manually update the file list:

```bash
node generate-file-list.js
```

This will regenerate `files.json` with the current repository structure.

## Repository Structure

```
BIT/
├── BIT Project/          # BIT project files
├── Semester 5/           # Semester 5 course materials
│   ├── EN5106 Fundamentals of Management & Entrepreneurship/
│   ├── IT5206 Professional Practice/
│   ├── IT5306 Principles of Information Security/
│   ├── IT5406 Systems & Network Administration/
│   └── IT5506 Mathematics for Computing II/
├── index.html            # Main web application
├── files.json            # Auto-generated file structure
├── manifest.json         # PWA manifest for app installation
├── sw.js                 # Service Worker for offline support
└── generate-file-list.js # File list generator script
```

## Adding New Content

Simply add PDF files to any folder under `BIT Project/` or `Semester 5/`. The GitHub Action will automatically:

1. Detect the new files
2. Regenerate `files.json`
3. Commit and push the updated file list
4. The website will automatically display the new files

## Mobile Responsiveness

The website is optimized for mobile devices with:

- **Touch-friendly**: All interactive elements have minimum 44x44px touch targets
- **Responsive Text**: Font sizes adjust appropriately for screen size
- **Optimized Layout**: Content reflows for optimal viewing on any device
- **Landscape Support**: Special handling for landscape orientation on mobile
- **Safe Areas**: Respects device notches and safe areas

## Progressive Web App (PWA)

The application can be installed as a native app:

### Installation
- **Chrome/Edge**: Click the install button in the address bar
- **Safari (iOS)**: Tap Share > Add to Home Screen
- **Android**: Tap the install prompt or use the browser menu

### PWA Features
- Offline access to previously viewed PDFs
- App icon on home screen
- Full-screen experience
- Automatic updates when new content is available

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## Development

### Requirements

- Node.js 18 or higher (for file list generation)

### Local Testing

1. Clone the repository
2. Run `node generate-file-list.js` to generate the file list
3. Serve the files using any local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   ```
4. Open `http://localhost:8000` in your browser

## License

This repository is for educational purposes as part of the BIT program.

## Accessibility

The website follows WCAG 2.1 guidelines:

- Proper semantic HTML
- Keyboard navigation support
- Focus indicators
- ARIA labels for interactive elements
- Sufficient color contrast
- Responsive text sizing
- Screen reader compatible
- Reduced motion support

## Performance

- Lazy loading of PDFs
- Efficient file tree rendering
- Minimal external dependencies
- Optimized for mobile data usage
- Service Worker caching
- Loading skeletons for better perceived performance

## Security

The application implements enterprise-grade security measures:

- **Content Security Policy (CSP)**: Restricts resource loading to trusted sources
- **XSS Prevention**: All user-facing content uses secure DOM APIs (textContent, createElement)
- **Input Validation**: PDF paths are validated before loading
- **No eval()**: Code does not use eval or innerHTML with user data
- **HTTPS Ready**: All external resources use HTTPS

For detailed security information, see [SECURITY_FIXES.md](SECURITY_FIXES.md).
