/**
 * @author Trilogis
 */

/*
 IMPORTS
 */

var nodeDao = require('./../dao/node-dao.js');
var entityBuilder = require('./../util/entity-util.js');
var responseUtil = require('./../services_util/response.js');

function listen (router){

    /*
    the web service searches for a node object with the given identifier and it
    returned the object found as JSON. If the identifier is not recognized in the system,
    then an empty object is returned.
     */
  	router.get('/node/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list'        :
                [   responseUtil.send,
                    entityBuilder.fromResult
                ]
        };

        nodeDao.getNodeById(request.params.id, _callback);
	});
}

exports.start = listen;