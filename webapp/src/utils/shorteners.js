export const numberShortener = (value) => {
    let newValue = value
    if (value >= 1000) {
        let suffixes = ["", "k", "m", "b","t"]
        let suffixNum = Math.floor( (`${value}`).length/4 )
        let shortValue = ''
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision))
            let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'')
            if (dotLessShortValue.length <= 4) { break }
        }
        if (shortValue % 1 !== 0)  shortValue = shortValue.toFixed(1)
        newValue = shortValue+suffixes[suffixNum]
    }
    return newValue
}

// TODO: textShortener to shorten long strings of claims text/headline
