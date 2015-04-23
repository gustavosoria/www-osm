/**
 * @author Trilogis Srl
 * @author Gustavo German Soria
 *
 * Response util module
 */

var send = function(callback) {
    if (callback) {

        if (callback.obj) {
            callback.parameter.setHeader('Content-Type', 'application/json');
            callback.parameter.end(JSON.stringify(callback.obj));
        } else {
            callback.parameter.end("an error as occurred with code 001");
        }
    }
};

var print = function(callback) {
    callback.parameter.setHeader('Content-Type', 'application/json');
    if (callback.obj === undefined){
        callback.obj = {"type": "GeometryCollection", "geometries": []};
    }

//    delete callback.rows[0];
//    delete callback.rows[1];

    for (var i in callback.rows){

        var obj = callback.rows[i];
        var geom = JSON.parse(callback.rows[i].geom);
        var toJSON = {
            'type': geom.type,
            'id': obj.osm_id,
            'coordinates': geom.coordinates,
            'properties': {}
        }

        delete obj['way'];
        delete obj['osm_id'];
        delete obj['bgeom'];
        delete obj['geom'];
        delete obj['geomm'];

        for (var k in obj) {
            if (!(obj[k] === null || obj[k] === undefined)) {
                if (k === 'color_fill' || k === 'color_border'){
                    toJSON.properties[k] = "#"+obj[k];
                } else {
                    toJSON.properties[k] = obj[k];
                }
            }
        }
        callback.obj.geometries.push(toJSON);
    }

    var _next = callback.list.pop();
    if (_next){
        _next(callback);
    } else {
        callback.parameter.end(JSON.stringify(callback.obj));
    }
};

var printGeometry = function(callback) {
    callback.parameter.setHeader('Content-Type', 'application/json');
    var toJSON = {};
    if (callback.rows && callback.rows[0] && callback.rows[0].way[0]) {
        var obj = callback.rows[0].way[0];
        var geom = JSON.parse(callback.rows[0].geom);
        toJSON = {
            'type': geom.type,
            'id': obj.osm_id,
            'coordinates': geom.coordinates,
            'properties': {}
        }

        delete obj['way'];
        delete obj['osm_id'];
        delete obj['geom'];

        for (var k in obj) {
            if (!(obj[k] === null || obj[k] === undefined)) {
                if (k === 'color_fill' || k === 'color_border') {
                    toJSON.properties[k] = "#" + obj[k];
                } else {
                    toJSON.properties[k] = obj[k];
                }
            }
        }
    }
    callback.parameter.end(JSON.stringify(toJSON));
};


var printNames = function(callback) {
    callback.parameter.setHeader('Content-Type', 'application/json');

    var list = [];
    var checkExtant = function (name) {
        for (var i in list) {
            if (name === list[i].value) {
                return true;
            }
        }
        return false;
    }

    if (callback.rows) {
        for (var j in callback.rows) {
            if (!checkExtant(callback.rows[j].name)) {
                list.push({
                    'id'    : callback.rows[j].osm_id,
                    'value' : callback.rows[j].name,
                    'type' : callback.entity
//                    'lod' : callback.rows[j].lod
                });
            }
        }

        var result = {
            'match': callback.name.replace("%",""),
            'list': list
        }

        callback.parameter.end(JSON.stringify(result));
    }

};

var outputNames = function(callback) {
    if (callback){
        if (callback.list){
            callback.parameter.setHeader('Content-Type', 'application/json');
            callback.parameter.end(JSON.stringify(callback.list));
        } else {
            callback.parameter.end("an error as occurred with code 002");
        }
    }
};

exports.send = send;
exports.print = print;
exports.printNames = printNames;
exports.printGeometry = printGeometry;
exports.outputNames = outputNames;