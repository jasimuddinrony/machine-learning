import qs from 'qs';
export const paramUtil = {
    removeBlankAttribute,
    stringifyRequestPayload,
    stringifyRequest,
    isEmptyField,
    isMatchField,
    isEmailField,
    isInLength,
    isDigit,
    isVersionName,
    isTelephoneNumber,
    isInRange,
    isGreater,
    isFunction,
    isValidUrl,
    sanitize,
    isValidPasswordFormat,
    checkThreeConsecutiveCharacter,
    checkHasConsecutiveIdenticalCharacter,
    isEmptyObject,
    isEmptyArray,
    isEmptySet,
    isNumericInput,
    isTagOrKeyword,
    getQueryParams
}

function removeBlankAttribute(params) {
    let result = {}
    for (let propName in params) {
        if (params[propName] !== null && params[propName] !== undefined && params[propName] !== '') {
            result[propName] = (typeof params[propName] === "string") ? params[propName].trim() : params[propName]
        }
    }
    return result
}

function stringifyRequestPayload(params, arrayFormat = "repeat", allowDots = true) {
    return {
        params: removeBlankAttribute(params),
        paramsSerializer: function (params) {
            return stringifyRequest(params, arrayFormat, allowDots)
        }
    }
}

function stringifyRequest(params, arrayFormat = "repeat", allowDots = true) {
    return qs.stringify(removeBlankAttribute(params), {arrayFormat: arrayFormat, allowDots: allowDots})
}

function isEmptyField(field) {
    return  field === null
        || field === undefined
        || (typeof field === "string" && field.trim() === '')
        || field.length === 0;
}

function isMatchField(...fields) {
    const matchRes = fields.reduce((prevMatch, field) =>
        prevMatch === undefined || prevMatch === field ? field : false
    );
    return  matchRes !== false;
}

function isEmailField(value) {
    // regexp for email checking
    // return validator.isEmail(value)

}

function isValidPasswordFormat(value) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*&#])[A-Za-z\d@$!%^*&#]{8,}$/
    return regexp.test(value)
}

function isInLength(value, min, max) {
    return value.length >= min && value.length <= max
}

function isDigit(value, includedSymbols) {
    // regexp for digits
    const regexp = /^[0-9\b]+$/;
    return regexp.test(value)
}

function isVersionName(value, separatorChars = '.') {
    // regexp for digits and dots
    const regexp_template = `^[0-9${separatorChars}\b]+$`;
    const regexp = RegExp(regexp_template, 'gi')
    return regexp.test(value)
}

function isTelephoneNumber(value) {
    const regexp = /^[+]?\d{9,13}$/;
    return regexp.test(value)
}

function isInRange(value, min, max, minOrEqual = true, maxOrEqual = true) {
    value = parseFloat(value);
    min = parseFloat(min);
    max = parseFloat(max);

    if(minOrEqual && maxOrEqual) {
        return value >= min && value <= max;
    }else if(!minOrEqual) {
        return value > min && value <= max;
    }else if(!maxOrEqual) {
        return value >= min && value < max;
    }else {
        return value > min && value < max;
    }
}






function isGreater(checkValue, checkWithValue, isInclusive = true) {
    return isInclusive ? checkValue >= checkWithValue : checkValue > checkWithValue
}

function isFunction(func) {
    return !!(func && func.constructor === Function && func.call && func.apply)
}

function isValidUrl(url, validationOptions = {}) {
    // return validator.isURL(url, {
    //     ...validationOptions
    // });
}

function sanitize(payload) {
    let sanitizedPayload = {};
    Object.entries(payload).forEach((item => {
        let [key, value] = item;
        if(typeof value === "string") {
            sanitizedPayload[`${key}`] = value.trim();
        }else{
            sanitizedPayload[`${key}`] = value;
        }
    }));
    return sanitizedPayload;
}

function checkThreeConsecutiveCharacter(password) {
// lao-7883 - same character cannot be used more than 2 times in a row
    let result = true;
    const IdenticalRegex = /([a-zA-Z\d])\1{2,}/;
    if (!password) {
        result = false;
    } else if (IdenticalRegex.test(password)) {
        result = false;
    }
    return result;
}
function checkHasConsecutiveIdenticalCharacter(password) {
    const zeroToNine = "0123456789";
    const nineToZero = "9876543210";
    const aToZ = "abcdefghijklmnopqrstuvwxyz";
    const aToZUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const zToa = "zyxwvutsrqponmlkjihgfedcba";
    const zToaUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
    let result = true;

    if (!password) {
        result = false;
    }else{
        for (let i = 0; i < password.length - 3; i++) {
            const passwordChunk = password.substr(i, 4);
            if (zeroToNine.includes(passwordChunk) || aToZ.includes(passwordChunk) || aToZUpper.includes(passwordChunk)
                || nineToZero.includes(passwordChunk) || zToa.includes(passwordChunk) || zToaUpper.includes(passwordChunk)) {
                result = false;
                break;
            }
        }
    }
    return result;
}

function isEmptyObject(obj) {
    if(obj && !(obj instanceof Object)) throw new Error("Not a valid object");
    return !!(!(obj instanceof Object) || Array.isArray(obj) || (obj && Object.keys(obj).length === 0));
}

function isEmptyArray(arr) {
    if(arr && !(arr instanceof Object)) throw new Error("Not a valid array");
    return !!(!(arr instanceof Object) || !Array.isArray(arr) || (arr && arr.length === 0));
}

function isEmptySet(set) {
    if(set && !(set instanceof Object)) throw new Error("Not a valid set");
    return !!(!(set instanceof Object) || set.hasOwnProperty("size") || (set && set.size === 0));
}

function isNumericInput(value) {
    if (value) return /^[0-9]+$/i.test(value)
    else return true
}

function isTagOrKeyword(value) {
    if (value) return /^\S*$/i.test(value)
    else return true
}

function getQueryParams(searchParams) {
    const queryParamString = searchParams ? String(searchParams).split("?")[1] : "";
    return qs.parse(queryParamString);
}
