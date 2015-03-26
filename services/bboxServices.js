/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var wayDao = require('./../dao/way-dao.js');
var nodeDao = require('./../dao/node-dao.js');
var boundaryBuilder = require('./../util/boundary.js');
var entityBuilder = require('./../util/entity-util.js');
var responseUtil = require('./../services_util/response.js');

function listen (router){

    /*
    It retrieves the elements within given boundary and with the given level of detail.

    Post request example:
         {
         "latitudeLB": "46.06040",
         "latitudeUB": "46.06840",
         "longitudeLB": "11.11043",
         "longitudeUB": "11.11443",
         "lod": 15
         }

     If the syntax is incorrect, then an error with status code 400 is raised.
     */
    router.post('/bbox', function(request, response) {

        /*
        It checks the validity of the request
         */
        if (request.post.latitudeLB &&      //latitude lower bound
            request.post.latitudeUB &&      //latitude upper bound
            request.post.longitudeLB &&     //longitude lower bound
            request.post.longitudeUB &&     //longitude upper bound
            request.post.lod){              //level of detail

            /*
            Boundary is the object which includes the coordinates
             */
            var _bbox = boundaryBuilder.build(
                request.post.latitudeLB,
                request.post.latitudeUB,
                request.post.longitudeLB,
                request.post.longitudeUB);

            /*
             build of the callback object. It initially contains a list of methods
             to call in sequence during the execution, the match and level of detail value,
             and finally the response object reference.
             */
            var callback =
            {
                'bbox'       :    _bbox,
                'lod'         :   request.post.lod,
                'parameter'   :   response,
                'list' :
                    [   responseUtil.send,
                        entityBuilder.fromResult, nodeDao.getNodesByBBox,
                        entityBuilder.fromResult, wayDao.getWaysByBBox
                    ]
            };

            /*
             call the next method
             */
            callback.list.pop()(callback);
        }
        else{
            response.statusCode = 400;
            response.end('Error 400: Post syntax incorrect.');
        }
    });


    // only for test purposes
    router.get('/bbox', function(request, response) {

        /*
         Boundary is the object which includes the coordinates
         */
        var _bbox = boundaryBuilder.build(
            46.06040,
            46.07840,
            11.11043,
            11.14043);
//        var _bbox = boundaryBuilder.build(
//            46.06040,
//            46.06840,
//            11.11043,
//            11.11943);

        /*
         build of the callback object. It initially contains a list of methods
         to call in sequence during the execution, the match and level of detail value,
         and finally the response object reference.
         */
        var callback =
        {
            'bbox'       :    _bbox,
            'lod'         :   15,
            'parameter'   :   response,
            'list' :
                [   responseUtil.send,
//                    entityBuilder.fromResult, nodeDao.getNodesByBBox,
                    entityBuilder.fromResult, wayDao.getWaysByBBox
                ]
        };

        /*
         call the next method
         */
        callback.list.pop()(callback);

    });
}

exports.start = listen;