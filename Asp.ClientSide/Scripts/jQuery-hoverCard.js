(function ($) {
    $.fn.hoverCard = function (card, options) {
        var view = null;

        var settings = $.extend(true, {
            cardSelectedCss: 'hoverCardSelected',
            destroyWhenClosed: true,
            position: {
                my: "left top",
                at: "left bottom",
                of: $(this)
            }
        }, options || {});

        return this.each(function () {

            if (card instanceof Function) {
                card.apply(this)
            }

            var hideCall = null;

            $(this).mouseenter(function () {
                card.css('visibility', 'visible');
                card.position(settings.position);
            });

            $(this).mouseleave(function () {
                hideCall = window.setTimeout(hideCard, 100);
            });

            $(card).mouseenter(function () {
                window.clearTimeout(hideCall);
            });
            $(card).mouseleave(function () {
                data = $(this).data('hoverCard');
                if (data === undefined || !data.clicked) {
                    hideCard();
                }
            });
            $(card).click(function (e) {
                window.clearTimeout(hideCall);
                $(this).data('hoverCard', {
                    clicked: true
                });
                $(this).addClass(settings.cardSelectedCss);
                e.stopPropagation();
            });
            $(card).bind('clickoutside', function () {
                $(card).data('hoverCard', {
                    clicked: false
                });
                hideCard();
            });

            function hideCard() {
                if (settings.destroyWhenClosed && card.Destroy) {
                    card.Destroy();
                }
                else {
                    $(card).removeClass(settings.cardSelectedCss);
                    $(card).css('visibility', 'hidden')
                }
            }
        });
    }
})(jQuery);