/**
 * @author Trilogis
 * @author Trilogis
 * Node Tag Name model
 * @type {{}}
 */
var model = {};

    /*
     table name
     */
    model.tablename = "nodes_tags_names";

    /*
     fields
     */

    //

    /*
     table name + fields
     */
    model.parentId = model.tablename+".parent_id";
    model.tagId = model.tablename+".tag_id";
    model.key = model.tablename+".key";
    model.value = model.tablename+".value";

module.exports.model = model;