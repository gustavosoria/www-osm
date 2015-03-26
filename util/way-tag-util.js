/**
 * @author Trilogis
 */

/**
 * Build the object from the result list of the database.
 * @param callback the object which contains the information about the current process and the next methods calls
 */
var fromResult = function(callback){
    /*
    the field 'obj' encloses the main object. If the field is still undefined, then the object
    is initialized.
     */
    if (callback.obj === undefined) {
        callback.obj = [];
    }

    /*
    the field 'rows' contains the result list from the database. An existence check is performed.
     */
    if (callback.rows){
        /*
        each element of the list represent an object that has to to transformed into a model
         */
        callback.rows.forEach(function(row) {
            /*
            duplicated objects are NOT allowed
             */
            if (!isDuplicated(callback.obj, row.value)) {
                /*
                since the module handles heterogeneous entities,
                the column which hosts the identifier has to be
                disambiguated
                 */
                var _id = undefined;
                /*
                way entity case
                 */
                if (row.way_id){
                    _id = row.way_id;
                } else
                /*
                 node entity case
                 */
                if (row.node_id){
                    _id = row.node_id;
                } else
                /*
                 relation entity case
                 */
                if (row.relation_id){
                    _id = row.relation_id;
                }
                /*
                finally the value of the id is parsed as integer
                 */
                if (_id){
                    _id = parseInt(_id);
                }
                /*
                finally the entry is analysed and stored in a list within the callback object
                 */
                callback.obj.push(
                    {
                        'value': row.value,
                        'entity': callback.entity,
                        'id': _id
                    }
                );
            }
        });
    }

    /*
    call the next method, checking the existence before
     */
    var _next = callback.list.pop();
    if (_next){
        _next(callback);
    }
}

/**
 * Check if the value of entry is already present in the final list
 * @param list list of current values
 * @param value value
 * @returns {boolean} true if the valuse is stored within the list, false otherwise.
 */
var isDuplicated = function(list, value){
    for (var i in list){
        if (list[i].value === value){
            return true;
        }
    }
    return false;
}

module.exports.fromResult = fromResult;