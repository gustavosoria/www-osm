/**
 * @author Trilogis
 * Relation Member model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "relations_members";

    /*
     fields
     */

    //

    /*
     table name + fields
     */
    model.relationId =  model.tablename+".relation_id";
    model.type = model.tablename+".type";
    model.ref = model.tablename+".ref";
    model.role = model.tablename+".role";

module.exports.model = model;