/// <reference path="../../Scripts/jquery-1.4.4-vsdoc.js" />
/// <reference path="../App.js" />
/// <reference path="../Views/CardView.js" />

ClientSide.Views.TaskList = ClientSide.Views.View.extend({
    init: function (container) {
        this._super('/Task/List/', container);
    },
    _InsertView: function (view) {
        this._super(view);
        // hook up delete event
        $('a[id^="delete_"]').click(function () {
            id = this.id.substring(7);
            $.ajax({
                url: '/Task/Delete',
                data: { id: id },
                type: 'POST',
                context: this,
                success: function (data) {
                    if (data.Success) {
                        ClientSide.DisplayMessage("Deleted");
                        $(document).trigger('TaskList.Deleted');
                    }
                    else {
                        ClientSide.DisplayError(data.Error);
                    }
                },
                error: function (xhr) {
                    ClientSide.DisplayError(xhr);
                }
            });
        });
        // hookup each link to be a hover card
        $('a[id^="item_"]').hoverCard(
            function () {
                taskId = this.idsubstring(5);
                view = new ClientSide.Views.CardView({ id: taskId });

            });
    }

});