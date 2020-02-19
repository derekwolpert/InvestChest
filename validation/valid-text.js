module.exports = validText = str => (
    typeof str === "string" && str.trim().length > 0
);
