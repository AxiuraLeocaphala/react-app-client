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
/*
$('body').on('click', '[href*="#"]', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - 100 }, 200);
});

$(window).scroll(function() {
    $('.categoryElem').each(function(i) {
        if (getActiveICatalogNav('#' + $(this).attr('id'))) {
            if (sliderCategory.selectedIndex != i) {
                let current = $(this).attr('id');
                $('.sliderCategory a').each(function() {
                    $(this).removeClass('active');
                })
                $('.sliderCategory a[href="#' + current + '"]').addClass('active');
                sliderCategory.select(i);
            }
        }
    });
});*/