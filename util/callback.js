/**
 * @author Trilogis
 *
 * The object is used to handle the callback functions within the services which involves the way entities
 * and the node entities.
 */

/**
 * The callback constructor which contains the callback function definition and the response object as
 * parameter.
 * @param callback_final the callback function
 * @param parameter the response object
 * @returns {{}} the callback object
 */
var build = function(response, list) {
    var callback = {};
    callback.parameter = response;
    callback.list = list;

  	return callback;
};


exports.build = build;