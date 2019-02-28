const exportFile = require("./export.js");
const readFile = require("./import.js");
const Slide = require("./slide.js");
const createTagMap = require('./createTagMap');

const paths = [
    'a_example.txt',
    'b_lovely_landscapes.txt',
    //'c_memorable_moments.txt',
    //'d_pet_pictures.txt',
    //'e_shiny_selfies.txt',
];

for (const path of paths) {
    run(path);
}

function run(path) {
    const images = readFile(path);
    const slides = [];
    const slideMap = new Map();
    let verticalSlide = new Slide();

    for (const image of images) {
        if (image.orientation === 'h') {
            const slide = new Slide();

            slide.addImage(image);
            slides.push(slide);
            slideMap.set(slide.id, slide);
        }

        if (image.orientation === 'v') {
            verticalSlide.addImage(image);

            if (verticalSlide.isFull()) {
                slides.push(verticalSlide);
                slideMap.set(verticalSlide.id, verticalSlide);

                verticalSlide = new Slide();
            }
        }
    }

    exportFile(slides, path);


};
