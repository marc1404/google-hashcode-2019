module.exports = function createTagMap(slides) {
    const tagMap = new Map();

    for (const slide of slides) {
        const tags = slide.getTags();

        for (const tag of tags) {
            let slides = tagMap.get(tag);

            if (!slides) {
                slides = [];

                tagMap.set(tag, slides);
            }

            slides.push(slide);
        }
    }

    return tagMap;
};