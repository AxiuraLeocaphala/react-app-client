export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + "=([^;]*)"
    ))
    console.log(matches);
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
    
    options = {
        path: '/',
        /*
        domain: 'axiuraleocephala.ru', // Доступ к куки только с указанного домена
        secure: true, // Передавать только по HTTPS
        */
        SameSite: strict, // Отправлять куки только с указанного домена
        httpOnly: true, // Запрещает доступ к куки через JS
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
    console.log(document);
    document.cookie = updateCookie;
    
}

/*
function deleteCookie(name) {
    setCookie(name, "", {'max-age': -1})
}*/