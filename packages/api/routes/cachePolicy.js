export default {
    /** @type CachePolicy **/
    noCache: {
        store: false
    },

    /** @type CachePolicy **/
    privateLongCachePolicy: {
        private: true,
        store: true,
        vary: 'content-type',
        maxAge: 60 * 60 /* 1 hour */,
    },

    /** @type CachePolicy **/
    privateShortCachePolicy: {
        private: true,
        store: true,
        vary: 'content-type',
        maxAge: 15 * 60 /* 15 min */,
    }
}

