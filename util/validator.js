/**
 * @author Trilogis
 * Check if the format of the identifier is valid
 * @param id the identifier value to check
 * @returns {*|boolean} boolean with the validity result
 */
var identifier = function(id){
    /*
    the identifier is valid if it is defined and greater than zero
     */
    //TODO check identifier format (must be a number)
    return id && id > 0;
}

/**
 * Check if the format of the level of detail is valid
 * @param lod level of detail value to check
 * @returns {*|boolean} boolean with the validity result
 */
var lod = function(lod){
    //TODO check lod format (must be a number)
    return lod && lod > 0 && lod <= 15;
}

/**
 * Check if the format of the bounding box is valid
 * @param bbox bounding box object to check
 * @returns {*|boolean} boolean with the validity result
 */
var bbox = function(bbox){
    //TODO check coordinates format
    return (bbox &&
        bbox.latitudeLB &&
        bbox.latitudeUB &&
        bbox.longitudeLB &&
        bbox.longitudeUB);
}

/**
 * Check if the match value is valid
 * @param id the identifier value to check
 * @returns {*|boolean} boolean with the validity result
 */
var match = function(value){
    /*
     the match is valid if the object is defined
     */
    return (value !== undefined);
}

module.exports.identifier = identifier;
module.exports.lod = lod;
module.exports.bbox = bbox;
module.exports.match = match;