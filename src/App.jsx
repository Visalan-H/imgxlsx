import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const maxCols = 150;
      const maxRows = 150;

      let canvasWidth = img.width;
      let canvasHeight = img.height;

      // Resize if image exceeds limits
      if (img.width > maxCols || img.height > maxRows) {
        const scaleX = maxCols / img.width;
        const scaleY = maxRows / img.height;
        const scale = Math.min(scaleX, scaleY);

        canvasWidth = Math.floor(img.width * scale);
        canvasHeight = Math.floor(img.height * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;

      // Create workbook and worksheet using exceljs
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Image');

      // Set column widths and row heights for pixel-like appearance
      worksheet.columns = Array(canvasWidth).fill({ width: 2 });
      for (let y = 1; y <= canvasHeight; y++) {
        worksheet.getRow(y).height = 12;
      }

      // Fill cells with background color
      for (let y = 0; y < canvasHeight; y++) {
        const row = worksheet.getRow(y + 1);
        for (let x = 0; x < canvasWidth; x++) {
          const pixelIndex = (y * canvasWidth + x) * 4;
          const r = pixels[pixelIndex];
          const g = pixels[pixelIndex + 1];
          const b = pixels[pixelIndex + 2];
          const hexColor = rgbToHex(r, g, b);

          // Calculate brightness level (0-255) using luminance formula
          const brightness = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

          const cell = row.getCell(x + 1);
          cell.value = brightness.toString();
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF' + hexColor }
          };
          cell.font = {
            color: { argb: 'FF000000' }, // Black text
            size: 8,
            bold: false
          };
          cell.alignment = {
            horizontal: 'center',
            vertical: 'middle'
          };
          // Optionally remove borders for a cleaner look
          cell.border = undefined;
        }
        row.commit();
      }

      // Generate Excel file and trigger download
      try {
        const buffer = await workbook.xlsx.writeBuffer();

        // Create blob and download using anchor link
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Excel file generated successfully');
      } catch (error) {
        console.error('Error generating Excel file:', error);
        alert('Error generating Excel file');
      }

      setLoading(false);
    };

    img.onerror = () => {
      setLoading(false);
      alert('Error loading image');
    };
  };

  // Function to convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase();
  };

  return (
    <div className="mobile-padding">
      <div className="main-container">
        {/* Main Content */}
        <div className="card-container">
          <div className="main-title">
            Image to Excel Converter
          </div>

          <p className="subtitle">
            Transform your images into colorful Excel spreadsheets with brightness values
          </p>

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                disabled={loading}
                className="file-input"
              />
              <div className="upload-content">
                <div className="upload-icon">
                  {file ? '✓' : '+'}
                </div>
                <div className={`upload-text ${file ? 'has-file' : 'no-file'}`}>
                  {file ? file.name : 'Click or drag image here'}
                </div>
                <div className="upload-subtext">
                  Supports JPG, PNG, GIF, WebP
                </div>

              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`submit-button ${loading || !file ? 'disabled' : 'enabled btn-primary'}`}
            >
              {loading ? (
                <>
                  <span className="button-icon">...</span>
                  Processing...
                </>
              ) : (
                <>
                  <span className="button-icon">↗</span>
                  Generate Excel File
                </>
              )}
            </button>
          </form>

          {loading && (
            <div className="loading-area">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <span className="loading-text">
                  Converting pixels to Excel...
                </span>
              </div>

              <div className="loading-description">
                Max dimensions: 150x150 pixels<br />
                Each cell shows color + brightness value (0-255)
              </div>
            </div>
          )}
        </div>

        {/* How it works - Right side */}
        <div className="info-box">
          <div className="info-title">
            How it works:
          </div>
          <div className="info-content">
            • Each pixel becomes an Excel cell with matching background color<br />
            • Cell values show brightness levels from 0 (dark) to 255 (bright)<br />
            • Large images are automatically resized to 150×150 for performance<br />
            • Download starts automatically when conversion is complete
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;