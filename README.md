# Custom Input Everywhere - Browser Extension

A Firefox extension that provides a customizable input experience, moving text input areas to more ergonomic positions on your screen.

## Features

- **Habit Mode**: Creates a floating input box that syncs with any focused input field
- **Advanced Mode**: Uses AI to intelligently reposition and optimize input fields
- **Customizable positioning**: Choose between top, center, or custom positions
- **Keyboard shortcuts**: Quickly toggle modes and visibility
- **Style customization**: Adjust font size, colors, and transparency

## Installation

### For Development:

1. Clone this repository or download the source files
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Select any file from the extension directory

### For Production:

1. Package the extension as a .zip file
2. Submit to Firefox Add-ons for review and distribution

## Usage

### Basic Usage:

1. Click the extension icon in your toolbar
2. Toggle "Habit Mode" to enable the floating input box
3. Focus any text input field to activate the floating input

### Advanced Features:

1. Enable "Advanced Mode" in the popup
2. Enter your OpenAI API key (required for AI features)
3. Customize the default position and other settings
4. Focus text inputs to see AI-optimized positioning

### Keyboard Shortcuts:

- **Toggle Habit Mode**: Ctrl+Shift+H
- **Toggle Advanced Mode**: Ctrl+Shift+A

## Configuration

Customize the extension through the popup settings:

- Choose between Habit Mode and Advanced Mode
- Set default position (Top, Center, Custom)
- Configure AI settings (requires API key)
- Adjust visual appearance

## Requirements

- Firefox browser (latest version recommended)
- For Advanced Mode: OpenAI API key (free tier available)

## Building

No build process required - the extension works with the raw source files.

## Troubleshooting

If the extension isn't working:

1. Ensure you're on a supported website (most will work)
2. Check that the mode is actually enabled
3. For Advanced Mode, verify your API key is correct
4. Try refreshing the page after enabling/disabling modes

## License

MIT License - see LICENSE file for details