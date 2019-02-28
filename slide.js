let nextSlideId = 0;

class Slide {
    constructor() {
        this.id = nextSlideId++;
        this.images = [];
        this.isIncluded = false;
        this.tags = null;
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
        if (this.tags) {
            return this.tags;
        }

        const tags = new Set();

        for (const image of this.images) {
            for (const tag of image.tags) {
                tags.add(tag);
            }
        }

        this.tags = Array.from(tags);

        return this.tags;
    }
}

module.exports = Slide;