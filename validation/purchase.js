const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validatePurchaseInput(data) {
    
    let errors = {};

    data.symbol = validText(data.symbol) ? data.symbol : "";
    data.purchasePrice = validText(data.purchasePrice) ? data.purchasePrice : "";
    data.numberOfShares = validText(data.numberOfShares) ? data.numberOfShares : "";

    if (!Validator.isLength(data.symbol, { min: 1, max: 5 })) {
        errors.symbol = "Symbol must be between 1 and 5 characters";
    }

    if (Validator.isEmpty(data.symbol)) {
        errors.symbol = "Symbol field is required";
    }

    if (!Validator.isDecimal(data.purchasePrice, { force_decimal: true, decimal_digits: '2,', locale: 'en-US' }) || Validator.isFloat(data.purchasePrice, { gt: 0 })) {
        errors.purchasePrice = "Purchase Price must be a value greater than $0.00.";
    }

    if (Validator.isEmpty(data.purchasePrice)) {
        errors.purchasePrice = "Purchase price is required";
    }

    if (!Validator.isInt(data.numberOfShares) || Validator.equals(data.numberOfShares, "0")) {
        errors.numberOfShares = "Number of Shares must be a whole number greater than 0";
    }

    if (Validator.isEmpty(data.numberOfShares)) {
        errors.numberOfShares = "Number of Shares field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};