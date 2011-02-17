var Person = Class.extend({
    init: function (first, last) {
        this.FirstName = first;
        this.LastName = last;
    },
    toString: function () {
        return this.FirstName + " " + this.LastName;
    }
});