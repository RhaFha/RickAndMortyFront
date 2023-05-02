export const ifNaN = (value: string) => {
    if (isNaN(parseInt(value))) {
        return 1;
    }

    return parseInt(value);
}