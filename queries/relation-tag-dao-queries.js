/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var relation = require('./../models/relation.js');
var relationTagName = require('./../models/relationTagName.js');
var relationTagNameRel = require('./../models/relationTagNameRel.js');
var relationTagNamePartial = require('./../models/relationTagNamePartial.js');
var relationType = require('./../models/relationType.js');

/**
 * Retrieve the relations which tags name values match with the given one [for a given level of detail].
 * It requires the following parameters:
 * 1: integer -> level of detail
 * 2: string -> match value
 *
 * @returns {string} the query
 */
var getByValue = function(){

    var _query = "" +
        "SELECT "+relationTagName.model.value+", "+"fullrelations."+relation.model.relationId+" "+
        "FROM "+relationTagName.model.tablename+" INNER JOIN ("+relation.model.tablename+" NATURAL JOIN "+relationType.model.tablename+") as fullrelations on fullrelations."+relation.model.relationId+" = "+relationTagName.model.parentId+" " +
        "WHERE fullrelations."+relationType.model.lod+" <= $1::integer AND "+relationTagName.model.tagId+" IN (" +
        "SELECT "+relationTagNameRel.model.tagNameId+" FROM "+relationTagNameRel.model.tablename+" WHERE "+relationTagNameRel.model.tagPartialId+" IN (" +
        "SELECT "+relationTagNamePartial.model.tagPartialId+" FROM "+relationTagNamePartial.model.tablename+" WHERE "+relationTagNamePartial.model.value+" ILIKE $2::varchar)" +
        ") " +
        "ORDER BY "+relationTagName.model.value;

    return _query;
}

module.exports.getByValue = getByValue;