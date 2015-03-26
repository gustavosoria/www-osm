/**
 * @author Trilogis
 * @author Trilogis
 * Relation model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "relations";

    /*
     fields
     */
    model.relationId = "relation_id";

    /*
     table name + fields
     */
    model.relationIdT = model.tablename+".relation_id";
    model.typeId = model.tablename+".type_id";
    model.geom = model.tablename+".geom";
    model.timestamp = model.tablename+".timestamp";
    model.uid = model.tablename+".uid";
    model.version = model.tablename+".version";
    model.changeset = model.tablename+".changeset";
    model.visible = model.tablename+".visible";

module.exports.model = model;