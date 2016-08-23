ClusterMonitor.Views.ClusterView = Marionette.ItemView.extend({
  tagName: 'li',
  className: "media-flex",
  attributes: function() {
    var severityColorMap = ['#789232', '#d5d82e', '#FDFF00', '#DC6C00', '#903731'];
    var strStyle = "background:"+ severityColorMap[parseInt(this.model.get('severity')) - 1];
    return {
      'style' : strStyle,
      'dc-code': this.model.get('dc')
    };
  },

  template: '#tpl-cluster',
  triggers: {

  },
});
