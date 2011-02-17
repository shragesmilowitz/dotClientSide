var Employee = Person.extend({
    init: function (first, last, salery) {
        this._super(first, last);
        this.Salery = salery;
    },
    toString: function () {
        return this._super() + " " + this.Salery;
    }
});