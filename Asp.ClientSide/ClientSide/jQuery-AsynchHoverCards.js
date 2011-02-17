var widget = {
    Hide: null,
    Clicked: false,
    _ViewPromiss: null,
    _init: function () {

        var that = this;
        $(document.body).append(that.options.$Container);

        $(that.element).bind('mouseenter', { widget: that }, function (e) {
            widget = e.data.widget;
            widget._ClearTimeout();
            widget.ShowContainer();
            if (widget.options.$Content == null) {
                // Insert Loading... text
                widget.options.$Container.html(widget.options.LoadingText);
                var id = widget.element.get(0).id;
                widget._ViewPromiss = widget.options.Load(id);
                widget._ViewPromiss.done(internalInit);
                widget._ViewPromiss.fail(function (jXhr, status) {
                    debug.log("Error: " + status);
                });
            }
        });
        $(that.element).bind('mouseleave', { widget: that }, function (e) {
            widget = e.data.widget;
            widget.Hide = window.setTimeout(CallHideContainer, 100);
        });

        that.options.$Container.bind('mouseenter', { widget: that }, function (e) {
            widget = e.data.widget;
            widget._ClearTimeout();
        });

        that.options.$Container.bind('mouseleave', { widget: that }, function (e) {
            widget = e.data.widget;
            if (!widget.Clicked) {
                CallHideContainer();
            }
        });
        that.options.$Container.bind('click', { widget: that }, function (e) {
            widget = e.data.widget;
            window.clearTimeout(widget.Hide);
            widget.Clicked = true
            $(this).addClass(widget.options.cardSelectedCss);
            e.stopPropagation();
        });
        that.options.$Container.bind('clickoutside', { widget: this }, function (e) {
            widget = e.data.widget;
            widget.Clicked = false;
            that.HideContainer();
        });

        function CallHideContainer() {
            that.HideContainer();
        }
        function internalInit(data) {
            debug.log("Inserting " + data.html + " into container");
            that.options.$Content = $(data.html);
            that.options.$Container.html($(data.html));
        }
    },
    _ClearTimeout: function () {
        if (this.Hide) {
            window.clearTimeout(this.Hide);
            debug.log("Clearing Timeout");
            this.Hide = null;
        }
    },
    HideContainer: function () {
        if (this._ViewPromiss && this._ViewPromiss.readyState > 0 && this._ViewPromiss.readyState < 4) { // Loading
            this._ViewPromiss.abort();
            debug.log("Aborted");
        }
        this.options.$Container.empty();
        this.options.$Content = null;
        this.options.$Container.removeClass(this.options.cardSelectedCss);
        this.options.$Container.css('visibility', 'hidden')
    },
    ShowContainer: function () {
        debug.log("Showing Container");
        this.options.$Container.css('visibility', 'visible');
        this.options.$Container.position(widget.GetContainerPosition());

    },
    GetContainerPosition: function () {
        this.options.position.of = this.element;
        return this.options.position;
    },
    options: {
        $Container: $('<div class="dialogbox"></div>'),
        $Content: null,
        LoadingText: 'Loading...',
        Load: null,
        cardSelectedCss: 'cardSelected',
        position: {
            my: "left top",
            at: "left bottom"
        }
    }
}
$.widget('ui.asyncHoverCard', widget);