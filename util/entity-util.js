/**
 * @author Trilogis
 */

/**
 * Constructor aux
 * @param id the identifier
 * @param type the type identifier
 * @param geom the geometry
 * @param tags the list of tags
 * @param names the list of name tags
 * @param entity entity string descriptor
 * @returns {{}} the object model
 */
var build_aux = function(id, type, geom, tags, names, entity){
    /*
     init of the object model
     */
    var _obj = {};

    /*
    geometry type
     */
    _obj.type = geom.type;

    /*
     identifier
     */
    _obj.id = id;


    /*
     entity type
     */
    _obj.entity = entity;

    /*
     coordinates [longitude, latitude]
     */
    _obj.coordinates = geom.coordinates;

    /*
     init of properties
     */
    _obj.properties = {};

    /*
     level of detail, line color of the geometry and type identifier
     */
    if (type && type[0]){
        _obj.properties.lod = type[0].lod;
        _obj.properties.color = "#"+type[0].type_color;
        _obj.properties.type = type[0].type_id;
    }

    /*
     tags
     */
    tags.forEach(function(tag){
        if(tag != null){
            addProperty(_obj, tag.key, tag.value);
        }
    });

    /*
     name tags
     */
    names.forEach(function(tag){
        /*
        the value has to include the prefix if it exists
         */
        if(tag != null){
            if (tag.prefix){
                tag.v = tag.prefix+" "+tag.v;
            }
            addProperty(_obj, tag.key, tag.value);
        }
    });
    return _obj;
}

/**
 * Add a field to the object
 * @param obj the main object
 * @param key the field name
 * @param value the field value
 */
var addProperty = function(obj, key, value){
    obj.properties[""+key+""] = value;
}

/**
 * Build an object model (or a list of object models) from the result list of the database
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var fromResult = function(callback){
    /*
     the field 'obj' encloses the main object. If the field is still undefined, then the object
     is initialized.
     */
    if (callback.obj === undefined) {
        callback.obj = {};
    }

    /*
     the field 'rows' contains the result list from the database. An existence check is performed.
     */
    if (callback.rows){

        var _resultLength = callback.rows.length;
        /*
        if the list size is 1 then the 'obj' field is a geometry, otherwise it is a GeometryCollection
         */
        if (_resultLength > 1){
            /*
            if the field is still undefined, then it is initialized
             */
            if (callback.obj.type === undefined) {
                callback.obj.type = "GeometryCollection";
            }

            /*
             if the field is still undefined, then it is initialized
             */
            if (callback.obj.geometries === undefined) {
                callback.obj.geometries = [];
            }

            /*
             each entry is transformed into an object model and pushed into the geometry list
             */
            callback.rows.forEach(function(row){
                callback.obj.geometries.push(build(row, callback.entity));
            });
        } else if (_resultLength > 0){
            callback.obj = build(callback.rows[0], callback.entity);
        }
    }
    /*
     call the next method, checking the existence before
     */
    var _next = callback.list.pop();
    if (_next){
        _next(callback);
    }
}

/**
 * Constructor
 * @param row the database row
 * @param entity entity string descriptor
 * @returns {{}} the object model
 */

var build = function(row, entity){
    /*
     since the module handles heterogeneous entities,
     the column which hosts the identifier has to be
     disambiguated
     */
    var _id = undefined;
    /*
     way entity case
     */
    if (row.way_id){
        _id = row.way_id;
    } else
    /*
     node entity case
     */
    if (row.node_id){
        _id = row.node_id;
    }

    var _obj = build_aux(
        _id,
        row.type,
        JSON.parse(row.geom),
        row.tags,
        row.names,
        entity);
    return(_obj);
}

module.exports.fromResult = fromResult;
module.exports.build = build;