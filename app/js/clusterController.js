ClusterMonitor.ClusterController = Marionette.Controller.extend({
  initialize: function(options) {
    this._router = options.router;
    this._clusters = options.clusters;
    this._mainRegion = options.mainRegion;


    var me = this;
    var clustersCollection = new ClusterMonitor.Collections.ClusterCollection();

    me._fetchClusters(me, clustersCollection);

    //fetch the collection every 1 min
    setInterval(function () {
      me._fetchClusters(me, clustersCollection);
    }, 60000);
  },

  _fetchClusters: function (me, clustersCollection) {
    me._clusters.fetch()
        .done(function(response) {
          console.log("Success!");
          if (response === 0) {
            me._createSampleData();
          }
          for(var index in response){
            var model =new ClusterMonitor.Models.ClusterModel(response[index], {parse: true});
            clustersCollection.add(model);
          }
          me._clusters = clustersCollection;
          me.showClusters();
        })
        .fail(function(response) {
          console.log("Error!");
        });
  },

  showClusters: function() {
    var clustersArr = new this._structureClusters(this._clusters);
    var resultArray = [];
    for (var i = 0; i < clustersArr.length; i++) {
      resultArray.push(new ClusterMonitor.Collections.ClusterCollection(clustersArr[i]))
    }

    var clustersView = new ClusterMonitor.Views.ClustersView({
      collection: resultArray
    });

    // clustersView.collection.models.sort(this.compareByDC);

    ClusterMonitor.mainRegion.show(clustersView);

    this._router.navigate('clusters');
    
  },

  compareByDC: function(model1, model2)
  {
    return parseFloat(model1.get('dc')) - parseFloat(model2.get('dc'));
  },

  newContact: function() {
  },
  editContact: function(cluster) {

  },
  _structureClusters: function (clusters) {
    var arrOfObjs =[[],[],[],[]];
    var index =0 ;
    for(index in clusters.models){
      if(clusters.models[index].get('dc')!== null)
      {
        arrOfObjs[parseInt(clusters.models[index].get('dc'))-1].push(clusters.models[index]);
      }
      index++
    }
    return arrOfObjs;

  },
  _createSampleData: function() {
    _.each([
      {
        "cluster": 2,
        "error[severity,count]": {"dwhlog Size > 3G ({ITEM.LASTVALUE1})": [5, 36], "dwhlog Size > 500M": [3, 36], "dwhlog Size > 1G": [4, 36], "eXelator Priority .log file larger than 100M": [2, 1], "eXelator Priority .log file larger than 250M": [3, 1], "Priority Synclog Size > 5G": [2, 1], "Priority Synclog Size > 4G": [1, 1]},
        "dc": 4,
        "severity": 5
      },
      {
        cluster: 3,
        error: 'dwhlog Size > 3G, dwhlog Size > 500M, dwhlog Size > 1G, eXelator Priority .log file larger than 100M eXelator Priority .log file larger than 250M Priority Synclog Size > 5G Priority Synclog Size > 4G',
        dc: '4',
        severity: '5'
      },
      {
        cluster: 1,
        error : 'this is one - dwhlog Size > 3G',
        dc: '4',
        severity: '5'
      },
      {
        cluster: 1,
        error : 'this is one - dwhlog Size > 3G',
        dc: '4',
        severity: '5'
      },
      {
        cluster: 1,
        error : 'this is one - dwhlog Size > 3G',
        dc: '1',
        severity: '5'
      },
      {
        cluster: 1,
        error : 'dwhlog Size > 3G',
        dc: '1',
        severity: '2'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '3',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '2',
        severity: '1'
      },
      {
        cluster: 1,
        error : 'dwhlog Size > 3G',
        dc: '2',
        severity: '3'
      },
      {
        cluster: 1,
        error : 'dwhlog Size > 3G',
        dc: '1',
        severity: '3'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '3',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '3',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '2',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '3',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'dwhlog Size > 3G',
        dc: '2',
        severity: '1'
      },
      {
        cluster: 2,
        error : 'eXelator Priority .log file larger than 100M',
        dc: '1',
        severity: '4'
      }], function(cluster) {
        this._clusters.create(cluster);
      }, this);
  }


  
  
});
