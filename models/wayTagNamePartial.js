/**
 * @author Trilogis
 * Way Tag Name Partial model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "ways_tags_names_partial";

    /*
     fields
     */
    //

    /*
     table name + fields
     */
    model.tagPartialId = model.tablename+".tag_partial_id";
    model.value = model.tablename+".value";

module.exports.model = model;