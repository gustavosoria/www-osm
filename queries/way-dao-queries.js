/**
 * @author Trilogis
 */

/*
IMPORTS
 */
var way = require('./../models/way.js');
var wayTag = require('./../models/wayTag.js');
var wayTagName = require('./../models/wayTagName.js');
var wayType = require('./../models/wayType.js');

/**
 * It permits to retrieve a Way object with its properties and tags by providing its identifier.
 * It requires the following parameters:
 * 1: bigint -> way's identifier.
 *
 * @returns {string} the query
 */
var getWayById = function(){
    var _query = "" +
        "SELECT "+way.model.wayId+", to_json(array_agg("+wayType.model.tablename+")) as type, " +
            "ST_AsGeoJSON("+way.model.geom+") as geom, to_json(array_agg("+wayTag.model.tablename+")) AS tags, " +
            "to_json(array_agg("+wayTagName.model.tablename+")) AS names " +
        "FROM ("+way.model.tablename+" NATURAL JOIN "+wayType.model.tablename+") " +
            "LEFT JOIN "+wayTag.model.tablename+" " +
                "ON "+way.model.wayId+" = "+wayTag.model.parentId+" " +
            "LEFT JOIN "+wayTagName.model.tablename+" " +
                "ON "+way.model.wayId+" = "+wayTagName.model.parentId+"  " +
        "WHERE "+way.model.wayId+" = $1::bigint " +
        "GROUP BY "+way.model.wayId+" " +
        "LIMIT 1";

    return _query;
}

/**
 * It permits to retrieve all the ways (each of them with its properties and tags included) by providing a bounding box.
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
var getWaysByBBox = function(){
    var _query = "" +
        "SELECT "+way.model.wayId+", to_json(array_agg("+wayType.model.tablename+")) as type, " +
            "to_json(array_agg("+wayTag.model.tablename+")) AS tags, " +
            "ST_AsGeoJSON(ST_FlipCoordinates("+way.model.geom+"), 7) as geom, " +
            "to_json(array_agg("+wayTagName.model.tablename+")) as names " +
        "FROM (SELECT * " +
            "FROM (" +
                "SELECT "+way.model.wayId+", "+way.model.typeId+", ST_Intersection("+way.model.geomT+", bbox.geom) as geom " +
            "FROM " +
            "ways," +
                " (SELECT ST_SetSRID(ST_MakeBox2d(ST_MakePoint($1::float, $2::float)," +
                " ST_MakePoint($3::float, $4::float)), 4326) as geom) as bbox " +
            "WHERE ST_Intersects("+way.model.geomT+", bbox.geom)" +
            ") fc ) as t NATURAL JOIN "+wayType.model.tablename+" LEFT JOIN "+wayTag.model.tablename+" " +
                "ON "+way.model.wayId+" = "+wayTag.model.parentId+" LEFT JOIN "+wayTagName.model.tablename+" " +
                "ON "+way.model.wayId+" = "+wayTagName.model.parentId+" " +
        "WHERE "+wayType.model.lod+" <= $5::integer "+
        "GROUP BY way_id, geom";
    return _query;
}

/**
 * It permits to retrieve all the ways (each of them with its properties and tags included) by providing a bounding box.
 * If a part of a geometry is inside the bounding box, then the whole geometry is retrieved without cut it.
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
var getWaysByBBox_no_cut = function(){
    var _query = "" +
        "SELECT "+way.model.wayId+", to_json(array_agg("+wayType.model.tablename+")) as type, ST_AsGeoJSON(ST_FlipCoordinates("+way.model.geom+")) as geom, to_json(array_agg("+wayTag.model.tablename+")) AS tags, to_json(array_agg("+wayTagName.model.tablename+")) AS names " +
        "FROM ("+way.model.tablename+" NATURAL JOIN "+wayType.model.tablename+") LEFT JOIN "+wayTag.model.tablename+" ON "+way.model.wayId+" = "+wayTag.model.parentId+" LEFT JOIN "+wayTagName.model.tablename+" ON "+way.model.wayId+" = "+wayTagName.model.parentId+"  " +
        "WHERE "+wayType.model.lod+" <= $5::float AND "+way.model.geom+" && ST_MakeEnvelope($1::float, $2::float, $3::float, $4::float, 4326) " +
        "GROUP BY "+way.model.wayId;
    return _query;
}

module.exports.getWayById = getWayById;
module.exports.getWaysByBBox = getWaysByBBox;