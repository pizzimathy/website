
module.exports = function (variable, expectedType) {
    return variable && (typeof variable === expectedType || variable instanceof expectedType)
}
