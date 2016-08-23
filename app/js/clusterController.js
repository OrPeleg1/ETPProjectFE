ClusterMonitor.ClusterController = Marionette.Controller.extend({
  initialize: function(options) {
    this._router = options.router;
    this._clusters = options.clusters;
    this._mainRegion = options.mainRegion;


    //this._clusters.fetch({silent: true});
    //this._clusters._reset()

    if (this._clusters.isEmpty()) {
      this._createSampleData();
    }

  },

  fetchClusters: function () {
    this._clusters.fetch({reset: true, silent: true});
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
    // clustersView.render();


    //clustersView.collection.models.sort(this.compareByDC);


    //TODO:fetch the collection every 10 sec
    // setInterval(function () {
    //   clustersView.collection.localStorage.clear;
    //
    //   clustersView.collection.fetch();
    // }, 10000);

    // this.listenTo(clustersView, 'sync reset', this.fetchClusters);
    // // this.listenTo(ClusterMonitor.Models.ClusterModel,'severity')
    // this.listenTo(clustersView, 'addContact:clicked', this.newContact);
    // this.listenTo(clustersView, 'itemview:delete:clicked', function(clusterView) {
    //   clusterView.model.destroy();
    // });
    // this.listenTo(clustersView, 'itemview:edit:clicked', function(clusterView) {
    //   this.editContact(clusterView.model.id);
    // });

     // var index = 0;
     //
     // for (index in clustersArr)
     // {
     //   var newClusterView = new ClusterMonitor.Views.ClustersView({
     //     collection: new Backbone.Collection(clustersArr[index]),
     //   });
    ClusterMonitor.mainRegion.show(clustersView);
     //   index++;
     // }

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
      arrOfObjs[parseInt(clusters.models[index].get('dc'))-1].push(clusters.models[index]);
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
