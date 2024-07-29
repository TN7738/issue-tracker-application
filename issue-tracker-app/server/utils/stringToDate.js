const stringToDate = (string) => {
    const parsedValue = new Date(string);
    if (!isNaN(parsedValue.getTime())) {
        return parsedValue;
    }
    return "";
};

module.exports = stringToDate;
