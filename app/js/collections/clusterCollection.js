ClusterMonitor.Collections.ClusterCollection = Backbone.Collection.extend({
  model: ClusterMonitor.Models.ClusterModel,
  localStorage: new Backbone.LocalStorage('clusters'),
  // url: "https://ip/getTable"
});
