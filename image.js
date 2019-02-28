class Image {
    constructor(id, orientation, tags) {
        this.id = id;
        this.orientation = orientation;
        this.numberOfTags = tags.length;
        this.tags = tags;
    }
}

module.exports = Image;