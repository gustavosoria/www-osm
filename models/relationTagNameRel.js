/**
 * @author Trilogis
 * Relation Tag Name rel model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "relations_tags_names_rel";
    /*
     fields
     */
    model.tagNameId = "tag_name_id";
    model.tagPartialId = "tag_partial_id";

    /*
     table name + fields
     */
    model.tagNameIdT = model.tablename+".tag_name_id";
    model.tagPartialIdT = model.tablename+".tag_partial_id";


module.exports.model = model;