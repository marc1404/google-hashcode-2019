const fs = require("fs");
const Image = require("./image.js");

module.exports = (path) => {
    const content = fs.readFileSync(path, "utf8");
    const lines = content.split("\n");
    const images = [];
    let nextImageId = 0;

    for (let line of lines) {
        line = line.replace("\r", "");
        let lineSplitted = line.split(" ");

        if(lineSplitted[1] !== undefined) {
            const orientation = lineSplitted[0].toLowerCase();
            const image = new Image(nextImageId++, orientation, lineSplitted.slice(2));

            images.push(image);
        }
    }

    return images;
}