ClusterMonitor.Views.ClustersView = Marionette.CompositeView.extend({
  template: '#tpl-clusters',
  className: 'media-list row clusters-container',
  itemView: ClusterMonitor.Views.DCView,
  // itemView: ClusterMonitor.Views.ClusterView,
  // itemViewContainer: '.clusters-container',
  itemViewContainer: '.dc-container',
  triggers: {
    // 'click .add-contact-btn': 'addContact:clicked'
  },
  render: function () {
    var elem = this.$el
    //this.options.collection.each(function (dcCollection) {
    _(this.options.collection).each(function (dcCollection) {
      var dcView = new ClusterMonitor.Views.DCView({
        collection: dcCollection
      });
      dcView.render();
      elem.append(dcView.$el);

    });
  }
  
  
});
