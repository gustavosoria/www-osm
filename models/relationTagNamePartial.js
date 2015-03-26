/**
 * @author Trilogis
 * Relation Tag Name Partial model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "relations_tags_names_partial";

    /*
    fields
    */
    model.tagPartialId = "tag_partial_id";
    model.value = "value";

    /*
    table name + fields
    */
    model.tagIdT = model.tablename+".tag_partial_id";
    model.valueT = model.tablename+".value";


module.exports.model = model;