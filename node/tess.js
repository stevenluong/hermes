var path = require('path');
var Tesseract = require('tesseract.js')
const image = path.resolve(__dirname, 'uploads/99d3c62e46776d36f161af08a95334e4');
Tesseract.recognize(image, 'eng', { logger: m => console.log(m) })
  .then(({ data: { text } }) => {
          console.log(text);
            });
