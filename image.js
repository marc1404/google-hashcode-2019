class Image {
    constructor(id, orientation, tags) {
        this.id = id;
        this.orientation = orientation;
        this.numberOfTags = tags.length;
        this.tags = tags;
        this.used = false;
    }

    hasMatchingTags(image) {
        return this.tags.some(tag => image.tags.includes(tag));
    }
}

module.exports = Image;