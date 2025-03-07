import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

//async function extractText(pdfPath) {
//    const data = new Uint8Array(fs.readFileSync(pdfPath));
//    const loadingTask = getDocument({ data });
//
//    const pdfDocument = await loadingTask.promise;
//    let textContent = '';
//
//    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
//        const page = await pdfDocument.getPage(pageNum);
//        const text = await page.getTextContent();
//        textContent += text.items.map(item => item.str).join(' ') + '\n\n';
//    }
//
//    return textContent;
//}

async function extractText(pdfPath) {
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = getDocument({ data });

    const pdfDocument = await loadingTask.promise;
    let textContent = '';

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const text = await page.getTextContent();

        let prevY = null;
        let pageText = '';

        text.items.forEach((item) => {
            const y = item.transform[5]; // Get vertical position
            if (prevY !== null && Math.abs(y - prevY) > 5) {
                pageText += '\n'; // Add line break when vertical position changes significantly
            }
            pageText += item.str + ' ';
            prevY = y;
        });

        textContent += pageText.trim() + '\n\n'; // Keep page breaks
    }

    return textContent;
}

(async () => {
    const pdfPath = process.argv[2];
    if (!pdfPath) {
        console.error('Usage: node main.js <pdf-file>');
        process.exit(1);
    }

    try {
        const text = await extractText(pdfPath);
        console.log(text);
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
})();

