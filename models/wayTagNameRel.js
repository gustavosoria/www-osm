/**
 * @author Trilogis
 * Way Tag Name rel model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "ways_tags_names_rel";

    /*
     fields
     */
    //

    /*
     table name + fields
     */
    model.tagNameId = model.tablename+".tag_name_id";
    model.tagPartialId = model.tablename+".tag_partial_id";

module.exports.model = model;