/**
 * @author Trilogis Srl
 * @author Gustavo German Soria
 *
 * Way DAO queries module
 */

/**
 * It retrieves a polygon object with its properties and tags by providing its identifier.
 *
 * It requires the following parameters:
 *
 * 1: bigint -> identifier.
 *
 * @returns {string} the query string
 */
var getPolygonByOsmId = function(){
    var _query = "SELECT array_to_json(array_agg(pol)) as way, ST_AsGeoJSON(way) as geom FROM (planet_osm_polygon NATURAL JOIN polygon_style_properties) as pol WHERE osm_id = $1::bigint AND is_deleted = false GROUP BY way";
    return _query;
}

/**
 * It retrieves a polyline object with its properties and tags by providing its identifier.
 *
 * It requires the following parameters:
 *
 * 1: bigint -> identifier.
 *
 * @returns {string} the query string
 */
var getPolylineByOsmId = function(){
    var _query = "SELECT array_to_json(array_agg(pol)) as way, ST_AsGeoJSON(way) as geom FROM (planet_osm_line NATURAL JOIN line_style_properties) as pol WHERE osm_id = $1::bigint AND is_deleted = false GROUP BY way "+
                 "UNION ALL "+
                 "SELECT array_to_json(array_agg(pol)) as way, ST_AsGeoJSON(way) as geom FROM (planet_osm_roads NATURAL JOIN line_style_properties) as pol WHERE osm_id = $1::bigint AND is_deleted = false GROUP BY way";
    return _query;
}

/**
 * It retrieves polygons (each of them with its properties and tags included) by providing a bounding box.
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
var getPolygonsByBbox = function(){
    var _query = "SELECT *, ST_AsGeoJSON(geomm) as geom " +
        "FROM (	SELECT * " +
        "FROM (	SELECT osm_id, type_id, ST_Intersection(planet_osm_polygon.way, bbox.geom) as geomm " +
        "FROM planet_osm_polygon, (SELECT ST_SetSRID(ST_MakeBox2d(ST_MakePoint($1::float, $2::float), ST_MakePoint($3::float, $4::float)), 4326) as geom) as bbox " +
    "WHERE ST_Intersects(planet_osm_polygon.way, bbox.geom) AND is_deleted = false) " +
    "fc ) as t NATURAL JOIN polygon_style_properties";
    return _query;
}

/**
 * It retrieves polylines (each of them with its properties and tags included) by providing a bounding box.
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
var getPolylinesByBbox = function(){

    var _query = "SELECT *, ST_AsGeoJSON(geomm) as geom FROM (SELECT * FROM (SELECT osm_id, type_id, ST_Intersection(planet_osm_roads.way, bbox.geom) as geomm FROM planet_osm_roads, (SELECT ST_SetSRID(ST_MakeBox2d(ST_MakePoint($1::float, $2::float), ST_MakePoint($3::float, $4::float)), 4326) as geom) as bbox WHERE is_deleted = false AND ST_Intersects(planet_osm_roads.way, bbox.geom)) fc ) as t NATURAL JOIN line_style_properties " +
    "UNION " +
    "SELECT *, ST_AsGeoJSON(geomm) as geom FROM (SELECT * FROM (SELECT osm_id, type_id, ST_Intersection(planet_osm_line.way, bbox.geom) as geomm FROM planet_osm_line, (SELECT ST_SetSRID(ST_MakeBox2d(ST_MakePoint($1::float, $2::float), ST_MakePoint($3::float, $4::float)), 4326) as geom) as bbox WHERE is_deleted = false AND ST_Intersects(planet_osm_line.way, bbox.geom)) fc ) as t NATURAL JOIN line_style_properties";

    return _query;
}

module.exports.getPolygonByOsmId = getPolygonByOsmId;
module.exports.getPolylineByOsmId = getPolylineByOsmId;
module.exports.getPolygonsByBbox = getPolygonsByBbox;
module.exports.getPolylinesByBbox = getPolylinesByBbox;