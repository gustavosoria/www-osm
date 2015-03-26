/**
 * @author Trilogis
 */

/*
IMPORTS
 */
var db = require('./../db/db.js');
var responseUtil = require('./../services_util/response.js');
var entityBuilder = require('./../util/entity-util.js');
var queriesRel = require('./../queries/relation-dao-queries.js');
var queriesWay = require('./../queries/way-dao-queries.js');
var queriesNode = require('./../queries/node-dao-queries.js');

/**
 * Constructor aux
 * @param _id the identifier
 * @param members members list
 * @returns {{}} the object model
 */
var build_aux = function(_id, members){
    var relation = {};
    relation.type = "Feature";
    relation.entity = "relation";
    relation.members =members;
    relation.properties = {};
    relation.properties.relationId = _id;
    return relation;
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
            a new callback object is created for each entry. It contains an empty obj field to store
            the object model and the methods calls to fill the entities
            */
            callback.rows.forEach(function(row){
                var cb = {};
                cb.list = [fillEntity, fromResult];
                cb.obj = {};
                db.execute(callback.getById, [row.relation_id], cb);
            });
        } else if (_resultLength > 0){
            callback.obj = build(callback.rows[0]);
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
 * Retrieve from the database the object model of the selected entity (way, node or relation) given its
 * identifier (field 'ref' of the member object).
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var fillEntity = function(callback){
    /*
    It represents the first step of the 'fill entities' process. It retrieves entities in
    a serial way, and the progress is regulated by the '_index' field of the callback object.
     */
    callback._listSize = callback.obj.members.length;
    callback._index = 0;

    if (callback._listSize > 0){
        /*
        the queries to retrieve the entities are set in the callback object
         */
        callback._queryWay = queriesWay.getWayById();
        callback._queryNode = queriesNode.getNodeById();
        callback._queryRelation = queriesRel.getRelationFullById();

        /*
        then the next call is set
         */
        callback.list = [fillEntity_aux];

        /*
        each type of entity requires a different query. The identifier is stored in the 'ref' field
        of the member object
         */
        if (callback.obj.members[0].type === 'way') {
            db.execute(callback._queryWay, [callback.obj.members[0].ref], callback);
        } else if (callback.obj.members[0].type === 'node') {
            db.execute(callback._queryNode, [callback.obj.members[0].ref], callback);
        } else if (callback.obj.members[0].type === 'relation') {
            db.execute(callback._queryRelation, [callback.obj.members[0].ref], callback);
        }
    }
}

/**
 * Retrieve from the database the object model of the selected entity (way, node or relation) given its
 * identifier (field 'ref' of the member object) and set the correct fields for the data exposure.
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var fillEntity_aux = function(callback){
    /*
    check if the entity has been retrieved successfully
     */
    if (callback.rows && callback.rows.length > 0) {
        var _entity;

        /*
        set the entity type: way | node | relation
         */
        callback.obj.members[callback._index].entity = callback.obj.members[callback._index].type;

        /*
        the node and way entities have a similar constructor, while the relation entity having a
        different structure requires its own
         */
        if (callback.obj.members[callback._index].type === 'relation') {
            _entity =  build(callback.rows[0]);
        } else {
            _entity =  entityBuilder.build(callback.rows[0], callback.obj.members[callback._index].entity);
        }

        /*
        set the geometry type: Point | LineString | MultiLineString
         */
        callback.obj.members[callback._index].type = _entity.type;

        /*
        set the coordinates which compose the geometry
         */
        callback.obj.members[callback._index].coordinates = _entity.coordinates;

        /*
        set the properties of the entity
         */
        callback.obj.members[callback._index].properties = _entity.properties;
    }

    /*
    increase the 'fill entities' progress
     */
    callback._index++;

    /*
    check if there are still entities to retrieve
     */
    if (callback._index < callback._listSize){
        /*
        set the next method call. It is executed after querying the database
         */
        callback.list = [fillEntity_aux];

        /*
         each type of entity requires a different query. The identifier is stored in the 'ref' field
         of the member object
         */
        if (callback.obj.members[callback._index].type === 'way') {
            db.execute(callback._queryWay, [callback.obj.members[callback._index].ref], callback);
        } else if (callback.obj.members[callback._index].type === 'node') {
            db.execute(callback._queryNode, [callback.obj.members[callback._index].ref], callback);
        } else if (callback.obj.members[callback._index].type === 'relation') {
            db.execute(callback._queryRelation, [callback.obj.members[callback._index].ref], callback);
        }
    } else {
        /*
        otherwise expose data
         */
        responseUtil.send(callback);
    }
}

/**
 * Constructor
 * @param row the database row
 * @returns {{}} the object model
 */

var build = function(row){
    var _relation = build_aux(
        row.relation_id,
        row.members);
    return(_relation);
}

module.exports.fromResult = fromResult;
module.exports.fillEntity_aux = fillEntity_aux;
module.exports.fillEntity = fillEntity;