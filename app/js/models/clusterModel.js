ClusterMonitor.Models.ClusterModel = Backbone.Model.extend({
  defaults: {
    cluster: null,
    error: [],
    errList : "",
    dc: null,
    severity: null
  },
  parse: function (data) {
    if (_.isObject(data.results)) {
      return data.results;
    } else {
      //var strJson = JSON.stringify(data);
      var index = 0;
      if(data.error.length === 0 && data['error[severity,count]']!== null) {
        for (var errMsg in data['error[severity,count]']){
          data.error[index]= {
            error: errMsg,
            severity: data['error[severity,count]'][errMsg][0]
          };
          index++;
        }
        // _.sortBy(data.error, 'severity');
        // var error = data.error.substr(0, data.error.length-2);
        // data.error = error ;
        data.error.sort(this.compareErrSeverity)
        var count =  1;
        for (var errObj in data.error){
          data.errList += ""+count+". "+ data.error[parseInt(errObj)].error+ '<br />';
          count++;
        }
      }
      if(data.errList === ""){
        data.errList = data.error;
      }
      return data;
    }
  },
  compareErrSeverity: function(error1, error2)
  {
    return parseFloat(error2.severity) - parseFloat(error1.severity);
  },


  
  cleanupModelData: _.noop,
  // changeColor: function (severity) {
  //  
  //  
  // }
});
