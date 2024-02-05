const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

function getActiveICatalogNav(target) {
    let w = $(window);
    let t = $(target);
    let wt = w.scrollTop();
    let wh = w.height() - tg.viewportHeight / 2;
    let eh = t.outerHeight();
    let et = t.offset().top;
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        return true;
    } else {
        return false;
    }
}