/**
 * @author Trilogis
 * @author Trilogis
 * Node model
 * @type {{}}
 */
var model = {};
    /*
    table name
     */
    model.tablename = "nodes";

    /*
    fields
     */
    model.nodeId = "node_id";

    /*
     table name + fields
     */
    model.nodeIdT = model.tablename+".node_id";
    model.geom = model.tablename+".geom";
    model.typeId = model.tablename+".type_id";

module.exports.model = model;