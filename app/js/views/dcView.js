ClusterMonitor.Views.DCView = Marionette.CompositeView.extend({
    template: '#tpl-dcs',
    className: 'dc-container',
    itemView: ClusterMonitor.Views.ClusterView,
    itemViewContainer: '.clusters-container',
    collection: new Backbone.Collection(),
    triggers: {
    },
    render: function () {
        var elem = this.$el
        this.options.collection.each(function (clusterModel) {
            // console.log('model',clusterModel);
            var clusterView = new ClusterMonitor.Views.ClusterView({
                model: clusterModel
            });
            clusterView.render();
            elem.attr('dc-code', clusterView.model.get('dc'));
            elem.append(clusterView.$el);

        })
    },
});
