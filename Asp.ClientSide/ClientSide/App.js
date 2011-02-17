var ClientSide = {
    Views: {},
    $MessageQueue: $({}),
    DisplayMessage: function (msg) {
        ClientSide.$MessageQueue.queue(function (next) {
            var html = $('<div id="message" style="position: fixed; width: 100%; background-color: white; top: -55px; left: 0px; text-align: center;"><div style="border: 1px solid gray; padding: 15px;">' + msg + '</div></div>');
            $(document.body).append(html);
            $('#message').animate({ top: 0 }, 1000, function () {
                $(this).delay(3000).animate({ top: -55 }, 1000, function () {
                    $('#message').remove();
                    next();
                })
            });
        });
    },
    Alert: function (title, html) {
        var $html = $(html);
        $(document.body).append($html);
        $html.dialog({
            title: title,
            draggable: false,
            resizable: false,
            model: true,
            autoOpen: true,
            buttons: { "Ok": function () { $(this).dialog("destroy"); } }
        });
    },
    DisplayError: function (err) {
        if (typeof (err) === "object") {
            this.Alert('Error', "<div>" + err.responseText + "</div>");
        }
        else {
            this.Alert('Error', "<div>" + err + "</div>");
        }
    },
    RequireAuthentication: function (callBack, scope, args) {
        return $.json({
            url: '/Account/IsAuthenticated',
            type: 'POST',
            contentType: 'application/json',
            success: function (data, textStatus, XMLHttpRequest) {
              if (data == true) {
                    if (args != null) {
                        callBack.apply((scope == null) ? this : scope, args);
                    }
                    else {
                        callBack.apply((scope == null) ? this : scope);
                    }
                }
                else {
                    ClientSide.DisplayMessage("Please Login First");
                }
            }
        });
    }
};

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();



/* View */
ClientSide.Views.View = Class.extend({
    init: function (url, container) {
        this.$View = null;
        this.Model = null;
        this.Url = url;
        this.PostData = null;
        this.Container = container;
    },
    _Load: function () {
        $.ajax({
            url: this.Url,
            context: this,
            //data: JSON.stringify({ PostData: this.PostData }),
            type: 'GET',
            contentType: 'application/json',
            success: this.LoadedSuccess,
            error: this.LoadedError
        });
    },
    LoadedSuccess: function (data, textStatus, XMLHttpRequest) {
        if (data.Success) {
            this._ExtractView(data.Html);
            this._InsertView(this.$View);
            this._SetupValidation();
            this.Model = data.Model;
            this.Show();
        }
        else {
            ClientSide.DisplayError(data.Error);
        }
    },
    LoadedError: function (xhr, textStatus, error) {
        ClientSide.DisplayError(xhr);
    },
    _ExtractView: function (data) {
        //this.Destory();
        this.$View = $(data).not("SCRIPT");
    },
    _InsertView: function ($view) {
        $(this.Container).append($view);
    },
    _SetupValidation: function(){
        var view = this.$View;
        if (this.SubmisionCompleted) {
            view.data('data-ajax-complete', { handler: this.SubmisionCompleted, scope: this });
        }
        if (this.SubmissionSuccess) {
            view.data('data-ajax-success', { handler: this.SubmissionSuccess, scope: this });
        }
        if (this.SubmissionBegin) {
            view.data('data-ajax-begin', { handler: this.SubmissionBegin, scope: this });
        }
        if (this.SubmissionError) {
            view.data('data-ajax-failure', { handler: this.SubmissionError, scope: this });
        }
        $.validator.unobtrusive.parseDynamicContent(this.$View);
    },
    Show: function () {
        if (this.$View == null) {
            this._Load();
        }
    },
    Refresh: function(){
        this.Destroy();
        this.Show();
    },
    Destroy: function () {
        $(this.$View).empty().remove();
        this.$View = null;
    }
});

/* Dialog View */
ClientSide.Views.DialogView = ClientSide.Views.View.extend({
    init: function (url, options) {
        this._super(url,$(document.body));
        this.PostData = null;
        this.Options = $.extend({
            autoOpen: false
        }, options || {});
    },
    Destroy: function () {
        $(this.$View).dialog("destroy").remove();
        this._super();
    },
    Show: function () {
        this._super();
        if (this.$View != null) {
            this.$View.dialog('open');
        }
    },
    _InsertView: function ($view) {
        this._super($view);
        $view.dialog(this.Options);
    },
    SubmissionSuccess: function(){
        this.Destory();
    }
});