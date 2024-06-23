// src/utils/PdfParser.js
import { PDFDocument } from 'pdf-lib';
import Tesseract from 'tesseract.js';

const parsePdf = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  let textContent = '';

  for (const page of pages) {
    const text = await page.getTextContent();
    textContent += text.items.map(item => item.str).join(' ');
  }

  return textContent;
};

const parseImage = async (file) => {
  const result = await Tesseract.recognize(file, 'eng', {
    tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.!?()[]{}<>+-*/=',
  });
  return result.data.text;
};

const parseFile = async (file) => {
  const fileType = file.type.split('/')[0];
  if (fileType === 'application') {
    return parsePdf(file);
  } else if (fileType === 'image') {
    return parseImage(file);
  }
  throw new Error('Unsupported file type');
};

export default parseFile;
