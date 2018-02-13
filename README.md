# hypermedia-boilerplate
Hypermedia boilerplate using nodejs, [Restify](http://restify.com/) as server, and [React](https://reactjs.org/) for client

## Features
- Absolute url links
- Client side cache policy
- Logging for client and api
- [Auth0](https://auth0.com/) support (username: admin, password: admin)
    - [OIDC Implicit](http://openid.net/specs/openid-connect-core-1_0.html#ImplicitFlowAuth) flow for single page app (SPA)
    - hypermedia server has to be hosted on <http://localhost:8080>
    - Client should be server from <http://localhost:3000>
- CORS support
- Accept [Collection+JSON](http://amundsen.com/media-types/collection/) media type
- Using [traverson](https://github.com/traverson/traverson) as json api client

## Remaining jobs / in progress
- PUT and POST sample
- DB query
- Cache policy automation test
- Client
- Material-ui support 
- health check/ping

## Used services and packages
- [Auth0](https://auth0.com/)
- [React](https://reactjs.org/) and create-react-app
- bunyan 
- [Restify](http://restify.com/)
- material-ui

## Future support
- Koa server
- popup login
- IdentityServer support

## License
MIT

