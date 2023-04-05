import { JsPDFAdapter, PDFMakeAdapter } from './adapters';

const title = 'Super title';
const content = 'Text here, or what ever works to fill some space.';

const adapter = JsPDFAdapter;
// const adapter = PDFMakeAdapter;

adapter.print(title, content);
adapter.printWithWatermark(title, content);

console.log('Finish!');
