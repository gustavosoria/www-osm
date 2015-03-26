/**
 * @author Trilogis
 */

/**
 * Constructor aux
 * @param _id the identifier
 * @param _type the type identifier
 * @param _geom the geometry
 * @param _tags the list of tags
 * @param _names the list of name tags
 * @returns {{}} the way object
 */
var build_aux = function(_id, _type, _geom, _tags, _names){
    var node = {};
    node.type = "Point";
    node.entity = "node";
    var _coords = JSON.parse(_geom).coordinates;
    node.coordinates = [_coords[0], _coords[1]];
    node.properties = {};
    node.properties.nodeId = _id;
    if (_type && _type[0]){
        node.properties.lod = _type[0].lod;
        node.properties.color = "#"+_type[0].type_color;
        node.properties.type = _type[0].type_id;
    }
    _tags.forEach(function(tag){
        if(tag !== null){
            addProperty(node, tag.key, tag.value);
        }
    });
    _names.forEach(function(tag){
        if(tag !== null){
            if (tag.prefix){
                tag.v = tag.prefix+" "+tag.v;
            }
            addProperty(node, tag.key, tag.value);
        }
    });

    return node;
}

var addProperty = function(node, key, value){
    node.properties[""+key+""] = value;
}

var fromResult = function(result, callback){
//    console.log(result.rows);
    var _next = callback.list.pop();
    if (callback.obj === undefined) {
        callback.obj = {};
    }
    if (result.rows){
        var _resultLength = result.rows.length;
        if (_resultLength > 1) {
            if (callback.obj.type === undefined) {
                callback.obj.type = "GeometryCollection";
            }

            if (callback.obj.geometries === undefined) {
                callback.obj.geometries = [];
            }

            console.log("geometries contains "+ callback.obj.geometries.length + " elements");
            result.rows.forEach(function(row){
                callback.obj.geometries.push(build(row));
            });

            console.log("geometries contains "+ callback.obj.geometries.length + " elements");
            console.log("-------");
        } else if (_resultLength > 0){
            callback.obj = build(result.rows[0]);
        }
    }
    _next(callback);
}

var build = function(row){
    var _node = build_aux(
        row.node_id,
        row.type,
        row.geom,
        row.tags,
        row.names);
    return(_node);
}

module.exports.fromResult = fromResult;
module.exports.build = build;