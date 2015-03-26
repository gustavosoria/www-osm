/**
 * @author Trilogis
 * Way Tag model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "ways_tags";

    /*
    fields
    */

    //

    /*
     table name + fields
     */
    model.parentId = model.tablename+".parent_id";
    model.key = model.tablename+".key";
    model.value = model.tablename+".value";

module.exports.model = model;