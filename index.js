const exportFile = require("./export.js");
const readFile = require("./import.js");
const Slide = require("./slide.js");

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

    let head = slides[0];
    const queue = slides.slice(1);
    const chain = [ head ];

    while (queue.length > 0) {
        let bestIndex = null;
        let bestSlide = null;
        let highestInterest = -1;

        for (let i = 0; i < queue.length; i++) {
            const slide = queue[i];
            const interest = head.calculateInterestFactor(slide);

            if (interest > highestInterest) {
                bestIndex = i;
                bestSlide = slide;
                highestInterest = interest;
            }
        }

        head = bestSlide;

        chain.push(bestSlide);
        queue.splice(bestIndex, 1);
        console.log(queue.length);
    }


    exportFile(chain, path);

    function createTagMap(slides) {
        const tagMap = new Map();

        for (const slide of slides) {
            const tags = slide.getTags();

            for (const tag of tags) {
                let set = tagMap.get(tag);

                if (!set) {
                    set = new Set();

                    tagMap.set(tag, set);
                }

                set.add(slide.id);
            }
        }

        return tagMap;
    }

    // function readFile(path) {
    //     const content = fs.readFileSync(path, "utf8");
    //     const lines = content.split("\n");
    //     const images = [];
    //     let nextImageId = 0;

    //     for (let line of lines) {
    //         line = line.replace("\r", "");
    //         let lineSplitted = line.split(" ");

    //         if(lineSplitted[1] !== undefined) {
    //             const orientation = lineSplitted[0].toLowerCase();
    //             const image = new Image(nextImageId++, orientation, lineSplitted.slice(2, lineSplitted.length));

    //             images.push(image);
    //         }
    //     }

    //     return images;
    // }
};
