export function _createDateFormat(date) {
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December']

    const month = monthArray[date.getMonth()];
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    const str = `${month} ${day}, ${date.getFullYear()}`
    return str
}

//console.log(_createDateFormat(new Date('2021-2-3')));

