/**
 * @author Trilogis
 * @author Trilogis
 * Node Type model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "nodes_types";

    /*
     fields
     */
    model.lod = "lod";

    /*
     table name + fields
     */
    model.typeId = model.tablename+".type_id";
    model.typeKey = model.tablename+".type_key";
    model.typeValue = model.tablename+".type_value";
    model.typeColor = model.tablename+".type_color";
    model.lodT = model.tablename+".lod";

module.exports.model = model;