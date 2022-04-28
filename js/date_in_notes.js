export function _findDateInNotes(text) {
    if (!text) return null;

    const template = /(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[ \/\.\-](\d{4}|\d{2})\b/gi;

    const dates = text.match(template)

    return dates ? dates.join(', ') : ''
}

//console.log(_findDateInNotes('By bread, cucumbers, banans, water, potatoes. I have to do shopping either 22.05.2022 or 27/5/22'));