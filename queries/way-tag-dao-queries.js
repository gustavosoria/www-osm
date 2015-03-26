/**
 * @author Trilogis
 */

/*
 IMPORTS
 */
var way = require('./../models/way.js');
var wayTagName = require('./../models/wayTagName.js');
var wayTagNameRel = require('./../models/wayTagNameRel.js');
var wayTagNamePartial = require('./../models/wayTagNamePartial.js');
var wayType = require('./../models/wayType.js');

/**
 * Retrieve the ways which tags name values match with the given one [for a given level of detail].
 * It requires the following parameters:
 * 1: integer -> level of detail
 * 2: string -> match value
 *
 * @returns {string} the query
 */
var getByValue = function(){
    var _query = "" +
        "SELECT "+wayTagName.model.value+", "+"fullways."+way.model.wayId+" "+
        "FROM "+wayTagName.model.tablename+" INNER JOIN ("+way.model.tablename+" NATURAL JOIN "+wayType.model.tablename+") as fullways on fullways."+way.model.wayId+" = "+wayTagName.model.parentId+" " +
        "WHERE fullways."+wayType.model.lod+" <= $1::integer AND "+wayTagName.model.tagId+" IN (" +
            "SELECT "+wayTagNameRel.model.tagNameId+" FROM "+wayTagNameRel.model.tablename+" WHERE "+wayTagNameRel.model.tagPartialId+" IN (" +
                "SELECT "+wayTagNamePartial.model.tagPartialId+" FROM "+wayTagNamePartial.model.tablename+" WHERE "+wayTagNamePartial.model.value+" ILIKE $2::varchar)" +
            ") " +
        "ORDER BY "+wayTagName.model.value+"";
    return _query;
}

module.exports.getByValue = getByValue;