# Image to Excel Converter

A modern web application that transforms images into colorful Excel spreadsheets where each pixel becomes an Excel cell with matching background color and brightness values.

## 🌟 Features

- **Image to Excel Conversion**: Convert any image (JPG, PNG, GIF, WebP) into an Excel spreadsheet
- **Brightness Analysis**: Each cell displays brightness values from 0 (dark) to 255 (bright) using luminance formula
- **Smart Resizing**: Large images are automatically resized to 150×150 pixels for optimal performance
- **Modern UI**: Clean, responsive design with dark theme
- **Automatic Download**: Excel file downloads automatically when conversion completes

# Check it out here : [Click here!](https://imgxlsx.vercel.app/)

## 🎨 How It Works

1. **Image Upload**: Select or drag an image file into the upload area
3. **Pixel Analysis**: Each pixel's RGB values are extracted and brightness is calculated
4. **Excel Generation**: 
   - Creates a new Excel workbook using ExcelJS
   - Maps each pixel to an Excel cell
   - Sets cell background color to match pixel color
   - Adds brightness value as cell content
   - Optimizes cell dimensions for pixel-like appearance
5. **Download**: Automatically triggers download of the generated Excel file

## 🔧 Technical Details

### Image Processing
- Maximum dimensions: 150×150 pixels (automatically resized if larger)
- Brightness calculation: `0.299 * R + 0.587 * G + 0.114 * B` (luminance formula)
- Color format: RGB to HEX conversion for Excel compatibility

## 🎉 Attribution

This project was inspired by:
- [Think Maths Spreadsheet](https://think-maths.co.uk/spreadsheet/)
- [YouTube Tutorial](https://www.youtube.com/watch?v=UBX2QQHlQ_I)

## 📄 File Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main application component
│   ├── App.css      # Component-specific styles
│   ├── main.jsx     # React entry point
│   ├── index.css    # Global styles and CSS variables
│   └── assets/      # Asset files
├── index.html       # HTML template
├── package.json     # Project dependencies and scripts
├── vercel.json      # Vercel deployment configuration
└── vite.config.js   # Vite configuration
```
