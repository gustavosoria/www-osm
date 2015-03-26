## www-osm

It provides geodata from an OpenStreetMap local database with the purpose of be used by the Web World Wind

## Prerequisites
Environment
* Node.js installed
* PostgreSQL installed (preferably to the latest stable version)
* Postgis extension installed and enable

Modules required:
* node-simple-router,`npm install node-simple-router` [as a temporary solution for the routing problem]
* node postgres, `npm install pg`

## Configuration

Geodata is stored in a local database. The credential can be set in the file `db/db.js`.
The fields to fill are:
```
/**
 * Username for the database connection
 * @type {string}
 */
var username = "required";

/**
 * Password for the database connection
 * @type {string}
 */
var password = "required";

/**
 * Name of the database
 * @type {string}
 */
var database = "required"; 
```

## Running

* Install Node
* Run `node index.js`
* APIs are available at `http://localhost:2222/`

## Services

* `node/:id`, GET, it returns a node object as JSON with the given identifier. If the identifier is not recognized, then an empty object is returned. Example: `http://localhost:2222/node/9201254`
* `way/:id`, GET,  it returns a way object as JSON with the given identifier. If the identifier is not recognized, then an empty object is returned. Example: `http://localhost:2222/way/13860002`
* `relation/:id`, GET, it returns a way object as JSON with the given identifier. If the identifier is not recognized, then an empty object is returned. Example: `http://localhost:2222/relation/4299085`
* `bbox`, POST, it retrieves the elements within given boundary and with the given level of detail.

    Post request example:
    ```
         {
         "latitudeLB": "46.06040",
         "latitudeUB": "46.06840",
         "longitudeLB": "11.11043",
         "longitudeUB": "11.11443",
         "lod": 15
         }
    ```
*`/search/:lod/:match`, GET, the service searches for a match over the wayName, nodeName and relationName tables with the given level of detail as threshold, returning the objects as JSON list. Partial names are allowed. Example: `/search/15/vigilio` or `/search/15/vigi`.
