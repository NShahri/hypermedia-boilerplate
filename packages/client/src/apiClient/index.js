import authProvider from "../infrastructure/authProvider";
import traverson, {CollectionJsonAdapter} from "./CollectionJsonAdapter";

function getApiUrlFromPage() {
    return document
        .querySelectorAll('link[rel=api]')[0]
        .href;

}

class ApiClient {
    constructor(rest) {
        this.rest = rest;
    }

    follow(...args) {
        this.rest.follow(...args);
        return this;
    }

    getResource() {
        return new Promise((fulfill, reject) => {
            this.rest.getResource((error, document) => {
                if (error) {
                    reject(error);
                }

                let itemClients = [];
                if (document && document.items) {
                    document.items.forEach(item => {
                        itemClients.push(ApiClient.getClient(item.href));
                    });
                }

                fulfill({document, itemClients});
            });
        });
    }

    /**
     * @private
     */
    static clients = {};

    static getClient(apiUrl = getApiUrlFromPage()) {
        if (!ApiClient.clients[apiUrl]) {
            ApiClient.clients[apiUrl] = new ApiClient(traverson
                .from(apiUrl)
                .withRequestOptions({
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Accept': CollectionJsonAdapter.mediaType,
                        'Authorization': `Bearer ${authProvider.authInfo.accessToken}`
                    }

                }));
        }

        return ApiClient.clients[apiUrl];
    }
}

export default ApiClient;