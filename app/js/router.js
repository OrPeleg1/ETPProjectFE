ClusterMonitor.Router = Marionette.AppRouter.extend({
  routes: {
    '': 'home'
  },

  home: function() {
    this.navigate('clusters', {
      trigger: true,
      replace: true
    });
  }
});
