const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validatePurchaseInput(data) {
    
    let errors = {};

    data.symbol = validText(data.symbol) ? data.symbol : "";
    data.purchasePrice = validText(data.purchasePrice) ? data.purchasePrice : "";
    data.numberOfShares = validText(data.numberOfShares) ? data.numberOfShares : "";

    if (!Validator.isLength(data.symbol, { min: 1, max: 6 })) {
        errors.symbol = "Ticker Symbol must be between 1 and 5 characters";
    }

    if (Validator.isEmpty(data.symbol)) {
        errors.symbol = "Ticker Symbol field is required";
    }

    if (!Validator.isCurrency(data.purchasePrice, { allow_negatives: false })) {
        errors.purchasePrice = "Purchase Price must be in a valid currency format greater than 0.00.";
    }

    if (Validator.isEmpty(data.purchasePrice)) {
        errors.purchasePrice = "Purchase price is required";
    }

    if (!Validator.isInt(data.numberOfShares, { gt: 0 })) {
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