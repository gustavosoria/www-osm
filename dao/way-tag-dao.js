/**
 * @author Trilogis
 *
 */

/*
IMPORTS
 */
var queries = require('./../queries/way-tag-dao-queries.js');
var db = require('./../db/db.js');
var validator = require('./../util/validator.js');
var error = require('./../util/error.js');

/**
 * Retrieve the tags which its name match with a given value. The match is left-fixed.
 * The results depend on the level of detail assigned
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var getTagsByName = function(callback) {
    /*
     Check the validity of the match value. An error is raised if it is not satisfied
     */
    if (!validator.match(callback.match)){
        error.send(callback, "invalid identifier [undefined or negative or zero]");
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
    callback.entity = 'way';

    /*
     both the match and lod values are ready to be used within the query.
     The match value is fixed on the left
     */
    var _params = [callback.lod, callback.match + "%"];

    /*
     The callback object includes the node builder method call and the one for the exposure
     of the information via JSON.
     */
    db.execute(queries.getByValue(), _params, callback);
}

module.exports.getTagsByName = getTagsByName;






