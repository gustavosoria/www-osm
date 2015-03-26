/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var node = require('./../models/node.js');
var nodeTag = require('./../models/nodeTag.js');
var nodeTagName = require('./../models/nodeTagName.js');
var nodeType = require('./../models/nodeType.js');

/**
 * It permits to retrieve a Node object with its properties and tags by providing its identifier.
 * It requires the following parameters:
 * 1: bigint -> node's identifier.
 *
 * @returns {string} the query
 */
var getNodeById = function(){
    var _query = "" +
        "SELECT "+node.model.nodeId+", to_json(array_agg("+nodeType.model.tablename+")) as type, ST_AsGeoJSON("+node.model.geom+") as geom, to_json(array_agg("+nodeTag.model.tablename+")) AS tags, to_json(array_agg("+nodeTagName.model.tablename+")) AS names " +
        "FROM ("+node.model.tablename+" NATURAL JOIN "+nodeType.model.tablename+") LEFT JOIN "+nodeTag.model.tablename+" ON "+node.model.nodeId+" = "+nodeTag.model.parentId+" LEFT JOIN "+nodeTagName.model.tablename+" ON "+node.model.nodeId+" = "+nodeTagName.model.parentId+"  " +
        "WHERE "+node.model.nodeId+" = $1::bigint " +
        "GROUP BY "+node.model.nodeId+" " +
        "LIMIT 1";
    return _query;
}

/**
 * It permits to retrieve all the nodes (each of them with its properties and tags included) by providing a bounding box.
 * If some parts of the geometries are not in the selected bounding box, then the geometries are cut and only the parts
 * within the bounding box are maintained.
 *
 * It requires the following parameters:
 * 1: bigint    ->  latitude lower bound;
 * 2: bigint    ->  longitude lower bound;
 * 3: bigint    ->  latitude upper bound;
 * 4: bigint    ->  longitude upper bound;
 * 5: integer   ->  level of detail;
 *
 * @returns {string} the query
 */
var getNodesByBBox = function(){
    var _query = ""+
        "SELECT "+node.model.nodeId+", to_json(array_agg("+nodeType.model.tablename+")) as type, ST_AsGeoJSON(ST_FlipCoordinates("+node.model.geom+")) as geom, to_json(array_agg("+nodeTag.model.tablename+")) AS tags, to_json(array_agg("+nodeTagName.model.tablename+")) AS names " +
        "FROM ("+node.model.tablename+" NATURAL JOIN "+nodeType.model.tablename+") LEFT JOIN "+nodeTag.model.tablename+" ON "+node.model.nodeId+" = "+nodeTag.model.parentId+" LEFT JOIN "+nodeTagName.model.tablename+" ON "+node.model.nodeId+" = "+nodeTagName.model.parentId+"  " +
        "WHERE "+nodeType.model.lod+" <= $1::float AND "+node.model.geom+" && ST_MakeEnvelope($2::float, $3::float, $4::float, $5::float, 4326) " +
        "GROUP BY "+node.model.nodeId;
    return _query;
}

module.exports.getNodeById = getNodeById;
module.exports.getNodesByBBox = getNodesByBBox;