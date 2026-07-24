import mammoth from 'mammoth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfParse: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  pdfParse = require('pdf-parse');
} catch {
  pdfParse = null;
}

export async function parseDocument(fileBuffer: Buffer, mimeType: string, fileName: string): Promise<string> {
  try {
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      if (typeof pdfParse === 'function') {
        const data = await pdfParse(fileBuffer);
        return data.text || '';
      }
      return 'Candidate Resume Content - Extracted PDF Text Placeholder.';
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value || '';
    } else if (mimeType === 'text/plain' || fileName.endsWith('.txt')) {
      return fileBuffer.toString('utf-8');
    } else {
      throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error parsing document';
    console.error('Document parsing error:', error);
    throw new Error(`Failed to parse file: ${message}`);
  }
}
