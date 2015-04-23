/**
 * @author Trilogis Srl
 * @author Gustavo German Soria
 *
 * Way Service module
 */

/**
 * Way DAO module
 * @type {exports}
 */
var wayDao = require('./../dao/way-dao.js');

/**
 * Boundary builder module
 * @type {exports}
 */
var boundaryBuilder = require('./../util/boundary.js');

/**
 * Response util module
 * @type {exports}
 */
var responseUtil = require('./../services_util/response.js');

function listen (router){

    /*
     the web service searches for a way object with the given identifier and it
     returned the object found as JSON. If the identifier is not recognized in the system,
     then an empty object is returned.
    */


    router.get('/polygon/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list'        :
                [   responseUtil.printGeometry
                ]
        };

        wayDao.getPolygonByOsmId(request.params.id, _callback);
    });

    router.get('/polyline/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list'        :
                [   responseUtil.printGeometry
                ]
        };

        wayDao.getPolylineByOsmId(request.params.id, _callback);
    });

    router.post('/bbox', function(request, response) {

        var latitudeLB = request.post.latitudeLB;
        var latitudeUB = request.post.latitudeUB;
        var longitudeLB = request.post.longitudeLB;
        var longitudeUB = request.post.longitudeUB;

        var _bbox = boundaryBuilder.build(
            latitudeLB,
            latitudeUB,
            longitudeLB,
            longitudeUB);

        var _callback =
        {
            lod             :    15,
            bbox            :    _bbox,
            parameter       :   response,
            list            :
                [   responseUtil.print,
                    wayDao.getPolylinesByBbox,
                    responseUtil.print
                ]
        };

        wayDao.getPolygonsByBbox(_callback);
    });

    router.get('/bboxtest', function(request, response) {

        var _bbox = boundaryBuilder.build(
            46.05878,
            46.06578,
            11.11473,
            11.12273);

        var _callback =
        {
            lod             :    15,
            bbox            :    _bbox,
            parameter       :   response,
            list            :
                [   responseUtil.print,
                    wayDao.getPolylinesByBbox,
                    responseUtil.print
                ]
        };

        wayDao.getPolygonsByBbox(_callback);
    });
}

exports.start = listen;