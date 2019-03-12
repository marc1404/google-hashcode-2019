const exportFile = require("./export.js");
const readFile = require("./import.js");
const Slide = require("./slide.js");
const createTagMap = require('./createTagMap');

const paths = [
    'a_example.txt',
    'b_lovely_landscapes.txt',
    'c_memorable_moments.txt',
    'd_pet_pictures.txt',
    'e_shiny_selfies.txt',
];

for (const path of paths) {
    run(path);
}

function run(path) {
    const images = readFile(path);
    const slides = [];
    let verticalImages = [];

    for (const image of images) {
        if (image.orientation === 'h') {
            const slide = new Slide();

            slide.addImage(image);
            slides.push(slide);
        }

        if (image.orientation === 'v') {
            verticalImages.push(image);
        }
    }

    while (verticalImages.length > 0) {
        if (verticalImages.length === 1) {
            break;
        }

        const head = verticalImages[0];
        const tail = verticalImages.slice(1);
        let found = false;

        for (let i = 0; i < tail.length && i < 100; i++) {
            const image = tail[i];

            if (!head.hasMatchingTags(image)) {
                const slide = new Slide();

                if (!head.used && !image.used) {
                    head.used = true;
                    image.used = true;

                    slide.addImage(head);
                    slide.addImage(image);
                    slides.push(slide);
                    verticalImages.splice(i + 1, 1);

                    found = true;

                    break;
                }
            }
        }

        if (!found) {
            const image = tail[0];
            const slide = new Slide();

            if (!head.used && !image.used) {
                head.used = true;
                image.used = true;

                slide.addImage(head);
                slide.addImage(image);
                slides.push(slide);
                verticalImages.splice(1, 1);
            }
        }
    }

    const tagMap = createTagMap(slides);
    const slideshow = [];
    const values = Array.from(tagMap.values());
    const sorted = values.sort((a, b) => {
        return b.length - a.length;
    });

    for (const slides of sorted) {
        for (const slide of slides) {
            if (!slide.isIncluded) {
                slide.isIncluded = true;

                slideshow.push(slide);
            }
        }
    }

    exportFile(slideshow, path);
}
