/// <reference path="../App.js" />

ClientSide.Views.CardView = ClientSide.Views.View.extend({
    init: function (data) {
        this._super('/Task/CardView', $(document.body));
        this.Data = data;
    },
    _InsertView: function (view) {

    }
});