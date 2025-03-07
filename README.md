# PDF Text Extractor with PDF.js

This project extracts text from PDF files using [pdf.js](https://mozilla.github.io/pdf.js/) in a **Node.js** environment, preserving line breaks.

## Features
- Extracts text from PDFs using `pdfjs-dist`
- Maintains original line breaks and paragraph structure
- Works in Node.js with ES Modules

## Requirements
- Node.js **20+** (Older versions may cause errors due to `Promise.withResolvers` usage)

## Installation
1. Install dependencies:
   ```sh
   npm install
   ```

## Usage
To extract text from a PDF file:

```sh
node main.js path/to/your.pdf
```

### **Extracted Text Output**
The script will print the extracted text while maintaining its original formatting.

## Troubleshooting
### **Error: `Promise.withResolvers is not a function`**
If you encounter this error, ensure you're using **Node.js 20+**:

### **Text is extracted without line breaks**
The script processes **Y-axis positions** to detect line breaks. If formatting is still incorrect, adjust the threshold in:
```javascript
if (prevY !== null && Math.abs(y - prevY) > 5) {
    pageText += '\n';
}
```
