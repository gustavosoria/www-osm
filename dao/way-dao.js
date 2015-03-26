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
var queries = require('./../queries/way-dao-queries.js');

/**
 * Retrieve the way entity with the given identifier, including its tags, properties and level of detail
 * @param id the identifier of the way entity
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var getWayById = function(id, callback) {

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
    db.execute(queries.getWayById(), _params, callback);
};

/**
 * Retrieve the ways within the given bounding box which satisfy the requested level of detail, including their tags.
 * The parts of the geometries which are out of the bounding box are cut.
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var getWaysByBBox = function(callback) {
    /*
     Check the validity of the bounding box. An error is raised if it is not satisfied
     */
    if (!validator.bbox(callback.bbox)){
        error.send(callback, "invalid bounding box");
    }

    /*
     Check the validity of the level of detail. An error is raised if it is not satisfied
     */
    if (!validator.lod(callback.lod)){
        error.send(callback, "invalid level of detail");
    }

    /*
     set the current entity type
     */
    callback.entity = "way";

    /*
     The variables are now ready to be used within the query
     */
    var _params = [ callback.bbox.latitudeLB,
                    callback.bbox.longitudeLB,
                    callback.bbox.latitudeUB,
                    callback.bbox.longitudeUB,
                    callback.lod];

    /*
     The callback object includes the way builder method call and the one for the exposure
     of the information via JSON.
     */
    db.execute(queries.getWaysByBBox(), _params, callback);
}

module.exports.getWayById = getWayById;
module.exports.getWaysByBBox = getWaysByBBox;