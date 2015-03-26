/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var relation = require('./../models/relation.js');
var members = require('./../models/relationMember.js');

/**
 * Retrieve a Relation object with its properties and tags by providing its identifier.
 * It requires the following parameters:
 * 1: bigint -> relation's identifier.
 *
 * @returns {string} the query
 */
var getRelationById = function(){
    var _query = "" +
        "SELECT "+relation.model.relationId+", to_json(array_agg("+members.model.tablename+")) as members "+
        "FROM "+relation.model.tablename+" NATURAL JOIN "+members.model.tablename+" "+
        "WHERE "+relation.model.relationId +" = $1::bigint "+
        "GROUP BY "+relation.model.relationId;
    return _query;
}

/**
 * Retrieve a Relation object with its properties, tags and geometry by providing its identifier.
 * It requires the following parameters:
 * 1: bigint -> relation's identifier.
 *
 * @returns {string} the query
 */
var getRelationFullById = function(){
    var _query = "" +
        "SELECT "+relation.model.relationId+", to_json(array_agg("+members.model.tablename+")) as members, ST_AsGeoJSON("+relation.model.geom+") as geom "+
        "FROM "+relation.model.tablename+" NATURAL JOIN "+members.model.tablename+" "+
        "WHERE "+relation.model.relationId +" = $1::bigint "+
        "GROUP BY "+relation.model.relationId;
    return _query;
}

module.exports.getRelationById = getRelationById;
module.exports.getRelationFullById = getRelationFullById;