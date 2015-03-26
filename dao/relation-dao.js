/**
 * @author Trilogis
 *
 * The module handles the way entities and its associations.
 */

/*
 IMPORTS
 */

var db = require('./../db/db.js');
var validator = require('./../util/validator.js');
var error = require('./../util/error.js');
var queries = require('./../queries/relation-dao-queries.js');

/**
 * Retrieve the way entity with the given identifier, including its tags, properties and level of detail
 * @param id the identifier of the way entity
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var getRelationById = function(id, callback) {

    /*
     Check the validity of the identifier. An error is raised if it is not satisfied
     */
    if (!validator.identifier(id)){
        error.send(callback, "invalid identifier [undefined or negative or zero]");
    }

    /*
     The way identifier is ready to be used within the query
     */

    var _params = [id];

    /*
     set the current entity type
     */
    callback.entity = "way";

    /*
     The callback object includes the way builder method call and the one for the exposure
     of the information via JSON.
     */
    db.execute(queries.getRelationById(), _params, callback);
};

module.exports.getRelationById = getRelationById;
//module.exports.getWaysByBBox = getWaysByBBox;