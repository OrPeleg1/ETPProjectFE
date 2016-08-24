ClusterMonitor.Collections.ClusterCollection = Backbone.Collection.extend({
  model: ClusterMonitor.Models.ClusterModel,
  // localStorage: new Backbone.LocalStorage('clusters'),
  url: "http://127.0.0.1:3000/clusters"
});
