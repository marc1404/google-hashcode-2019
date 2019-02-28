const fs = require("fs");

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
    let nextSlideId = 0;

    class Image {
        constructor(id, orientation, tags) {
            this.id = id;
            this.orientation = orientation;
            this.numberOfTags = tags.length;
            this.tags = tags;
        }
    }

    class Slide {
        constructor() {
            this.id = nextSlideId++;
            this.images = [];
            this.isIncluded = false;
        }

        addImage(image) {
            this.images.push(image);
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

            return Array.from(tags.toArray());
        }
    }

    const images = readFile(path);
    const slides = [];
    const slideMap = new Map();

    for (const image of images) {
        if (image.orientation === 'h') {
            
        }
    }

    let currentSlide = createSlide();

    for (const image of verticalImages) {
        if (currentSlide.isFull()) {
            currentSlide = createSlide();
        }

        currentSlide.addImage(image);
    }

    for (const image of horizontalImages) {
        const slide = createSlide();

        slide.addImage(image);
    }

    exportFile(slides);

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

    function createSlide() {
        const slide = new Slide();

        slides.push(slide);
        slideMap.set(slide.id, slide);

        return slide;
    }

    function readFile(path) {
        const content = fs.readFileSync(path, "utf8");
        const lines = content.split("\n");
        const images = [];
        let nextImageId = 0;

        for (let line of lines) {
            line = line.replace("\r", "");
            let lineSplitted = line.split(" ");

            if(lineSplitted[1] !== undefined) {
                const orientation = lineSplitted[0].toLowerCase();
                const image = new Image(nextImageId++, orientation, lineSplitted.slice(2, lineSplitted.length));

                images.push(image);
            }
        }

        return images;
    }

    function exportFile(slides) {
        console.log(`Exporting ${path}...`);
        let fileContent = "";

        fileContent += slides.length + "\r\n";

        for (const slide of slides) {
            fileContent += slide.images.map(image => image.id).join(' ');
            fileContent += "\r\n";
        }

        fs.writeFileSync(path + '.submission.txt', fileContent);
    }
};
