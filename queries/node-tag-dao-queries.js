/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var node = require('./../models/node.js');
var nodeTagName = require('./../models/nodeTagName.js');
var nodeTagNameRel = require('./../models/nodeTagNameRel.js');
var nodeTagNamePartial = require('./../models/nodeTagNamePartial.js');
var nodeType = require('./../models/nodeType.js');

/**
 * Retrieve the nodes which tags name values match with the given one [for a given level of detail].
 * It requires the following parameters:
 * 1: integer -> level of detail
 * 2: string -> match value
 *
 * @returns {string} the query
 */
var getByValue = function(){

    var _query = "" +
        "SELECT "+nodeTagName.model.value+", "+"fullnodes."+node.model.nodeId+" "+
        "FROM "+nodeTagName.model.tablename+" INNER JOIN ("+node.model.tablename+" NATURAL JOIN "+nodeType.model.tablename+") as fullnodes on fullnodes."+node.model.nodeId+" = "+nodeTagName.model.parentId+" " +
        "WHERE fullnodes."+nodeType.model.lod+" <= $1::integer AND "+nodeTagName.model.tagId+" IN (" +
        "SELECT "+nodeTagNameRel.model.tagNameId+" FROM "+nodeTagNameRel.model.tablename+" WHERE "+nodeTagNameRel.model.tagPartialId+" IN (" +
        "SELECT "+nodeTagNamePartial.model.tagPartialId+" FROM "+nodeTagNamePartial.model.tablename+" WHERE "+nodeTagNamePartial.model.value+" ILIKE $2::varchar)" +
        ") " +
        "ORDER BY "+nodeTagName.model.value;

    return _query;
}

module.exports.getByValue = getByValue;