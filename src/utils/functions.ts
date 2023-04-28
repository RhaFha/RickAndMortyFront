export const ifNaN = (value) => {
    if (isNaN(parseInt(value))) {
        return 1;
    }

    return parseInt(value);
}