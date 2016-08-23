var Backbone = require('backbone'),
    TableView = require('backbone-tableview'),
    _ = require('underscore')


module.exports = TableView.tbodyTr.extend({
    render: function() {
        var data = this.model.toJSON()
        data.amount = '$' + parseFloat(data.amount).toFixed(0)
        var tr = _.reduce(data, function(tr, attr){
            return tr += '<td>' + attr + '</td>'
        }, '')

        this.$el.html(tr)
    }
})