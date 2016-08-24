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
      // var data = JSON.stringify(eval('('+data+')'));
      var dataByModel = {
        "cluster": data.cluster,
        "error[severity,count]": data['error[severity,count]'],
        "error": [],
        "errList": "",
        "dc": data.dc,
        "severity": data.severity
      };
      var index = 0;
      if (dataByModel.dc !== null || dataByModel.dc !== undefined && dataByModel.cluster !== null || dataByModel.cluster !== undefined) {
        if (dataByModel.error.length === 0 && dataByModel['error[severity,count]'] !== null) {
          for (var errMsg in dataByModel['error[severity,count]']) {
            dataByModel.error[index] = {
              error: errMsg,
              severity: dataByModel['error[severity,count]'][errMsg][0]
            };
            index++;
          }
          // _.sortBy(data.error, 'severity');
          // var error = data.error.substr(0, data.error.length-2);
          // data.error = error ;
          if (dataByModel.error.length > 1) {
            dataByModel.error.sort(this.compareErrSeverity)
            var count = 1;
            for (var errObj in dataByModel.error) {
              dataByModel.errList += "" + count + ". " + dataByModel.error[parseInt(errObj)].error + '<br />';
              count++;
            }
          }
        }
        if (dataByModel.errList === "" && dataByModel.error.length > 0 ) {
          dataByModel.errList = dataByModel.error[0].error;
        }
        return dataByModel;
      }
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
