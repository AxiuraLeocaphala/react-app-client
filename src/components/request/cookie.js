export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + "=([^;]*)"
    ))
    console.log(matches);
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
    console.log(name, value, options);
    options = {
        path: '/',
        /*
        domain: 'axiuraleocephala.ru',
        secure: true,
        SameSite: strict,
        httpOnly: true,
        */
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updateCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updateCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updateCookie += "=" + optionValue;
        }
    }
    console.log(updateCookie)
    document.cookie = updateCookie;
    console.log(document.cookie);
}

/*
function deleteCookie(name) {
    setCookie(name, "", {'max-age': -1})
}*/