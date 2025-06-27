# Image to Excel Converter

A modern web application that transforms images into colorful Excel spreadsheets where each pixel becomes an Excel cell with matching background color and brightness values.

## 🌟 Features

- **Image to Excel Conversion**: Convert any image (JPG, PNG, GIF, WebP) into an Excel spreadsheet
- **Pixel-Perfect Mapping**: Each pixel becomes an Excel cell with exact color matching
- **Brightness Analysis**: Each cell displays brightness values from 0 (dark) to 255 (bright) using luminance formula
- **Smart Resizing**: Large images are automatically resized to 150×150 pixels for optimal performance
- **Modern UI**: Clean, responsive design with dark theme
- **Drag & Drop Support**: Easy file upload with visual feedback
- **Real-time Processing**: Live progress indicator during conversion
- **Automatic Download**: Excel file downloads automatically when conversion completes

# Check it out here : [Click here!](https://imgxlsx.vercel.app/)

## 🚀 Tech Stack

- **Frontend**: React 19.1.0 with Vite
- **Styling**: CSS3 with CSS Variables and Flexbox
- **Excel Generation**: ExcelJS library for creating .xlsx files
- **Canvas API**: HTML5 Canvas for image processing
- **Deployment**: Vercel-ready configuration

## 🎨 How It Works

1. **Image Upload**: Select or drag an image file into the upload area
2. **Canvas Processing**: The image is drawn onto an HTML5 canvas
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

### Excel Generation
- Cell width: 2 units for square appearance
- Row height: 12 units for optimal display
- Font: 8pt black text, centered alignment
- No borders for cleaner pixel art effect

### Performance Optimizations
- Canvas context with `willReadFrequently: true` for better pixel access
- Smart image resizing to prevent memory issues
- Efficient row processing with commit() for better performance

## 🎯 Use Cases

- **Digital Art**: Convert pixel art or digital drawings to Excel format
- **Data Visualization**: Create unique spreadsheet-based image representations
- **Educational**: Teach concepts about pixels, colors, and data representation
- **Creative Projects**: Generate artistic Excel files for presentations or portfolios

## 📱 Responsive Design

- **Desktop**: Side-by-side layout with equal height containers
- **Mobile**: Stacked layout optimized for touch interaction
- **Tablet**: Adaptive layout that works on all screen sizes

## 🎨 UI Components

- **Upload Area**: Drag-and-drop file upload with visual feedback
- **Progress Indicator**: Animated spinner during processing
- **Info Panel**: Instructions and feature explanations
- **Attribution Section**: Credits to inspirational resources

## 🔗 Dependencies

- `react`: ^19.1.0 - UI framework
- `react-dom`: ^19.1.0 - React DOM renderer
- `exceljs`: ^4.4.0 - Excel file generation

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## ⭐ Show Your Support

If you found this project helpful, please give it a star on GitHub!
