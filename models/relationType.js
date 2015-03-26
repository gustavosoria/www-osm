/**
 * @author Trilogis
 * Relation Type model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "relations_types";

    /*
     fields
     */
    model.lod = "lod";
    model.lodT = model.tablename+".lod";

    /*
     table name + fields
     */
    model.typeId = model.tablename+".type_id";
    model.typeKey = model.tablename+".type_key";
    model.typeValue = model.tablename+".type_value";
    model.typeColor = model.tablename+".type_color";


module.exports.model = model;