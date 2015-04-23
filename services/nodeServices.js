/**
 * @author Trilogis Srl
 * @author Gustavo German Soria
 *
 * Node Service module
 */

/**
 * Node DAO module
 * @type {exports}
 */
var nodeDao = require('./../dao/node-dao.js');

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
    the web service searches for a node object with the given identifier and it
    returned the object found as JSON. If the identifier is not recognized in the system,
    then an empty object is returned.
     */

    router.get('/point/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list'        :
                [   responseUtil.printGeometry
                ]
        };

        nodeDao.getNodeById(request.params.id, _callback);
    });

//    router.get('/bboxpoints', function(request, response) {
//
//        var _bbox = boundaryBuilder.build(
//            46.05878,
//            46.06578,
//            11.11473,
//            11.12273);
//
//        //11.09473, 46.06078
//        //11.12273, 46.08878
//
//        var _callback =
//        {
//            'lod'           :    15,
//            'bbox'          :    _bbox,
//            'parameter'     :   response,
//            'list'          :
//                [   responseUtil.print
//                ]
//        };
//
//        nodeDao.getPointsByBBox(_callback);
//    });
}

exports.start = listen;