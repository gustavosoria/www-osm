/**
 * @author Trilogis
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
exports.outputNames = outputNames;