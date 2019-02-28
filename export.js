const fs = require("fs");

module.exports = (slides, path) => {
    console.log(`Exporting ${path}...`);
    let fileContent = "";

    fileContent += slides.length + "\r\n";

    for (const slide of slides) {
        fileContent += slide.images.map(image => image.id).join(' ');
        fileContent += "\r\n";
    }

    fs.writeFileSync('./submissions/' + path + '.submission.txt', fileContent);
}