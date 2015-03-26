/**
 * @author Trilogis
 */

/*
 IMPORTS
 */

var relationDao = require('./../dao/relation-dao.js');
var relationBuilder = require('./../util/relation-util.js');
var responseUtil = require('./../services_util/response.js');

function listen (router){

    /*
     the web service searches for a relation object with the given identifier and it
     returned the object found as JSON. If the identifier is not recognized in the system,
     then an empty object is returned.
     */
  	router.get('/relation/:id', function(request, response) {

        var _callback =
        {
            'parameter'   :   response,
            'list' :
                [   responseUtil.send,
                    relationBuilder.fillEntity,
                    relationBuilder.fromResult
                ]
        };

        relationDao.getRelationById(request.params.id, _callback);
	});
}

exports.start = listen;