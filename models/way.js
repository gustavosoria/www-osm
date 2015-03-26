/**
 * @author Trilogis
 * Way model
 * @type {{}}
 */
var model = {};
    /*
     table name
     */
    model.tablename = "ways";
    /*
     fields
     */
    model.wayId = "way_id";
    model.geom = "geom";

    /*
     table name + fields
     */
    model.wayIdT =  model.tablename+".way_id";
    model.geomT = model.tablename+".geom";
    model.typeId = model.tablename+".type_id";
    model.timestamp = model.tablename+".timestamp";
    model.uid = model.tablename+".uid";
    model.version = model.tablename+".version";
    model.changeset = model.tablename+".changeset";
    model.visible = model.tablename+".visible";

module.exports.model = model;