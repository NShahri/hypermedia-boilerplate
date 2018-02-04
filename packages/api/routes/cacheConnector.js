/**
 * @typedef {object} CachePolicy
 * @property store {boolean} The cache should not store anything about the client request or server response. A request is sent to the server and a full response is downloaded each and every time.
 * @property private {boolean}
 * @property maxAge {number}
 * @property revalidate {null|'all'|'expiration'} - expiration: the cache must verify the status of the stale resources before using it and expired ones should not be used
 * @property eTag {string} can be used as a strong validator. - will be ignored when revalidate option is null.
 * @property lastModified {string} can be used as a weak validator. - will be ignored when revalidate option is null or eTag option is provided.
 * @property vary {string} determines how to match future request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.
 */

import config from "../infrastructure/config";

/**
 * validate and fix cache policy with right values
 * @param params {CachePolicy}
 * @returns {CachePolicy}
 */
function validateParams(params) {
    let paramsTemp = {...params};

    if (!paramsTemp.eTag && !paramsTemp.lastModified) {
        paramsTemp.revalidate = null;
    }

    if (paramsTemp.revalidate !== 'all' && paramsTemp.revalidate !== 'expiration') {
        paramsTemp.eTag = null;
        paramsTemp.lastModified = null;
    }

    if (!paramsTemp.maxAge && paramsTemp.revalidate === 'expiration') {
        paramsTemp.revalidate = 'all';
    }

    if (paramsTemp.eTag && paramsTemp.lastModified) {
        paramsTemp.lastModified = null;
    }

    return paramsTemp;
}

/**
 * returns header attributes and values for response
 * @param params {CachePolicy}
 * @returns {http.ServerResponse}
 */
function buildCacheHeaders(params) {
    let cacheControl = [];
    let headers = /** @type {http.ServerResponse} **/ {};

    if (params.store) {
        params = validateParams(params);

        cacheControl.push(params.private ? 'private' : 'public');

        params.revalidate === 'all' && cacheControl.push('no-cache');

        params.revalidate === 'expiration' && cacheControl.push('must-revalidate');

        params.maxAge && cacheControl.push(`max-age=${params.maxAge}`);

        headers['cache-control'] = cacheControl.join(',');

        params.eTag && (headers.etag = params.eTag);

        params.lastModified && (headers['last-modified'] = params.lastModified);
    }
    else {
        cacheControl.push('no-store');

        cacheControl.push('no-cache');

        cacheControl.push('must-revalidate');

        cacheControl.push('max-age=0');

        headers['cache-control'] = cacheControl.join(',');

        //
        // Http 1.0
        //
        headers['Pragma'] = 'no-cache';
    }

    return headers;
}

/**
 * @see https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
 * Defining optimal Cache-Control policy section
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#Cache_validation
 *
 * @param cache {CachePolicy}
 */
export default function cacheConnector(cache = {}) {
    return function (req, res, next) {
        try {
            let headers = buildCacheHeaders(cache);
            for (let key of Object.keys(headers)) {
                res.header(key, headers[key]);
            }

            next();
        }
        catch (e) {
            next(new InternalError(config.isProduction ? 'Unexpected error.' : e));
        }
    };
}
