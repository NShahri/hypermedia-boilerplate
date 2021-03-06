import {URL} from 'url';

const selfLinkName = 'self';
const upLinkName = 'up';

/**
 * This helper can generate links and feeds based on Collection+JSON hypermedia media type
 *
 * @see http://amundsen.com/media-types/collection/
 */
export default class HypermediaUrl {
    constructor(server, baseUrl) {
        this.server = server;
        this.baseUrl = baseUrl;
    }

    /**
     * @private
     *
     * @param params
     * @returns {URL}
     */
    routeUrl(...params) {
        return new URL(this.server.router.render(...params), this.baseUrl);
    }

    createSelfLink(req) {
        const route = req.getRoute();
        return this.createLink(selfLinkName, route.name, req.params);
    }

    createUpLink(routeName, params) {
        return this.createLink(upLinkName, routeName, params);
    }

    createLink(linkName, routeName, params) {
        return {
            rel: linkName,
            href: this.routeUrl(routeName, params)
        };

    }

    createFeed(collection = [], routeName) {
        return collection.map(m => ({href: this.routeUrl(routeName, m)}));
    }
}