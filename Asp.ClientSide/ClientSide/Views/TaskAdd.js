ClientSide.Views.TaskAdd = ClientSide.Views.DialogView.extend({
    init: function (options) {
        this._super('/Task/Create', options);
    }
});