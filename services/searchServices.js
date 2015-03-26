/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var wayTagDao = require('./../dao/way-tag-dao.js');
var relationTagDao = require('./../dao/relation-tag-dao.js');
var nodeTagDao = require('./../dao/node-tag-dao.js');
var responseUtil = require('./../services_util/response.js');
var tagUtil = require('./../util/way-tag-util.js');

/**
 * Web Services for the search operations
 * @param router
 */

//PUBLIC METHODS

function listen (router){
    /*
    The service searches for a match over the wayName, nodeName and relationName tables
     */
    router.get('/search/:lod/:match', function(request, response) {
        /*
        TODO: the router is no able to recognize parameters that contains a space (encoded or not). Then for tests purposes the spaces have been replaced with an underscore.
        */
        var _match = request.params.match.replace("_", " ");

        /*
        build of the callback object. It initially contains a list of methods
        to call in sequence during the execution, the match and level of detail value,
        and finally the response object reference.
         */
        var _callback =
        {
          'match'       :   _match,
          'lod'         :   request.params.lod,
          'parameter'   :   response,
          'list' :
              [   responseUtil.send,
                  tagUtil.fromResult, nodeTagDao.getTagsByName,
                  tagUtil.fromResult, relationTagDao.getTagsByName,
                  tagUtil.fromResult, wayTagDao.getTagsByName
              ]
        };

        /*
        call the next method
         */
        _callback.list.pop()(_callback);
    });
}

exports.start = listen;
