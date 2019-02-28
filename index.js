const exportFile = require("./export.js");
const readFile = require("./import.js");

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
    let nextSlideId = 0;

    class Slide {
        constructor() {
            this.id = nextSlideId++;
            this.images = [];
            this.isIncluded = false;
        }

        addImage(image) {
            this.images.push(image);
        }

        calculateInterestFactor(slide) {
            const a = this;
            const b = slide;
            let common = 0;
            let notInA = 0;
            let notInB = 0;
            const aTags = a.getTags();
            const bTags = b.getTags();
            const aMap = new Map();
            const bMap = new Map();

            for (const tag of aTags) {
                aMap.set(tag, true);
            }

            for (const tag of bTags) {
                bMap.set(tag, true);
            }

            for (const tag of aTags) {
                if (bMap.has(tag)) {
                    common++;
                } else {
                    notInB++;
                }
            }

            for (const tag of bTags) {
                if (!aMap.has(tag)) {
                    notInA++;
                }
            }

            return Math.min(common, notInA, notInB);
        }

        isFull() {
            let numberOfVerticals = 0;

            for (const image of this.images) {
                if (image.orientation === 'h') {
                    return true;
                }

                if (image.orientation === 'v') {
                    numberOfVerticals++;

                    if (numberOfVerticals === 2) {
                        return true;
                    }
                }
            }

            return false;
        }

        getTags() {
            const tags = new Set();

            for (const image of this.images) {
                for (const tag of image.tags) {
                    tags.add(tag);
                }
            }

            return Array.from(tags);
        }
    }

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
