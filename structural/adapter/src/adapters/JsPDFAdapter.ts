import { jsPDF } from 'jspdf';

import { LOGO_MARK } from '../constants';

export class JsPDFAdapter {
  public static print(title: string, content: string) {
    const doc = new jsPDF();

    doc.setFont('times', 'normal');
    doc.setFontSize(30);
    doc.text(title, 83, 21.5);
    doc.setFontSize(12);
    doc.text(content, 14, 37);
    doc.save('jsPdf.pdf');
  }

  public static printWithWatermark(title: string, content: string) {
    const doc = new jsPDF();

    doc.setFont('times', 'normal');
    doc.setFontSize(30);
    doc.text(title, 83, 21.5);
    doc.setFontSize(12);
    doc.text(content, 14, 37);
    doc.addImage(LOGO_MARK, 'JPEG', 30.5, 43.5, 149.5, 149.5);
    doc.save('jsPdfWithNotSoWaterMark.pdf');
  }
}
