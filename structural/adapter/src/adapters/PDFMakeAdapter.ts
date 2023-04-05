import fs from 'fs';
import PdfPrinter from 'pdfmake';
import { Alignment } from 'pdfmake/interfaces';

import { LOGO_MARK } from '../constants';

const fonts = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
};

export class PDFMakeAdapter {
  public static print(title: string, content: string) {
    const printer = new PdfPrinter(fonts);

    const dd = {
      content: [
        {
          text: title,
          style: 'header'
        },
        {
          text: content,
          style: 'paragraph'
        },
      ],
      styles: {
          header: {
              fontSize: 30,
              alignment: 'center' as Alignment,
              marginBottom: 30
          },
          paragraph: {
            marginBottom: 15,
            fontSize: 12,
          }
      },
      defaultStyle: {
        font: 'Times'
      }
    };

    const pdfDoc = printer.createPdfKitDocument(dd);

    pdfDoc.pipe(fs.createWriteStream('pdfMake.pdf'));
    pdfDoc.end();
  }

  public static printWithWatermark(title: string, content: string) {
    const printer = new PdfPrinter(fonts);

    const dd = {
      content: [
          {
              text: title,
              style: 'header'
          },
          {
            text: content,
            style: 'paragraph'
          },
        {
            image: 'octonyan',
            style: 'image'
        }
      ],
      images: {
          octonyan: LOGO_MARK
      },
      styles: {
          header: {
              fontSize: 30,
              alignment: 'center' as Alignment,
              marginBottom: 30
          },
          paragraph: {
            marginBottom: 15,
            fontSize: 12,
          },
          image: {
              alignment: 'center' as Alignment
          }
      },
      defaultStyle: {
        font: 'Times'
      }
    };

    const pdfDoc = printer.createPdfKitDocument(dd);

    pdfDoc.pipe(fs.createWriteStream('pdfMakeWithNotSoWaterMark.pdf'));
    pdfDoc.end();
  }
}
