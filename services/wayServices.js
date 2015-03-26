/**
 * @author Trilogis
 */

/*
 IMPORTS
 */

var wayDao = require('./../dao/way-dao.js');
var entityBuilder = require('./../util/entity-util.js');
var responseUtil = require('./../services_util/response.js');

function listen (router){

    /*
     the web service searches for a way object with the given identifier and it
     returned the object found as JSON. If the identifier is not recognized in the system,
     then an empty object is returned.
     */
  	router.get('/way/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list'        :
                [   responseUtil.send,
                    entityBuilder.fromResult
                ]
        };

		wayDao.getWayById(request.params.id, _callback);
	});
}

exports.start = listen;