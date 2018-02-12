import traverson from 'traverson';

export default class CollectionJsonAdapter {
    static mediaType = 'application/json';

    constructor(log) {
        this.log = log;
    }

    /**
     * @private
     */
    parseKey(key) {
        var match = key.match(/(.*)\[(.*):(.*)\]/);
        // ea:admin[title:Kate] => access by secondary key
        if (match) {
            return {
                mode: 'secondary',
                key: match[1],
                secondaryKey: match[2],
                secondaryValue: match[3],
                index: null,
            };
        }
        // ea:order[3] => index access into embedded array
        match = key.match(/(.*)\[(\d+)\]/);
        if (match) {
            return {
                mode: 'index',
                key: match[1],
                secondaryKey: null,
                secondaryValue: null,
                index: match[2],
            };
        }
        // ea:order[$all] => meta-key, return full array
        match = key.match(/(.*)\[\$all\]/);
        if (match) {
            return {
                mode: 'all',
                key: match[1],
                secondaryKey: null,
                secondaryValue: null,
                index: null,
            };
        }
        // ea:order => simple link relation
        return {
            mode: 'first',
            key: key,
            secondaryKey: null,
            secondaryValue: null,
            index: null,
        };
    }

    findNextStep(t, linkObject) {
        const doc = t.lastStep.doc;
        const key = linkObject.value;

        const match = key.match(/items\[(\d+)\]/);
        if (match) {
            let index = match[1];

            if(!doc.items || index >= doc.items.length){
                throw new Error(`Following item index ${index}, which does not exist. doc:${JSON.stringify(doc)}.`);
            }

            return {
                url: doc.items[index].href
            };
        }
        else {
            const nextUrl = doc.links.find(l => l.rel === key);
            if (!nextUrl) {
                throw new Error('Not found');
            }

            // return next step as an object
            return {
                url: nextUrl.href
            };
        }


    }
}


