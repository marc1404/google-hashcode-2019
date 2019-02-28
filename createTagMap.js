module.exports = function createTagMap(slides) {
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
};