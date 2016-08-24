// var ContactManager = new Marionette.Application({
//   Models: {},
//   Collections: {},
//   Views: {}
// });

var ClusterMonitor = new Marionette.Application({
    Models: {},
    Collections: {},
    Views: {}
});

// var severityColorMap = [
//     {key:1,value:'#00ff00'},
//     {key:2,value:'#00ff00'},
//     {key:3,value:'#00ff00'},
//     {key:4,value:'#00ff00'},
//     {key:5,value:'#ff0044'},
//     {key:6,value:'#ff0000'}];

ClusterMonitor.addRegions({
   mainRegion: '.main-container',
   leftRegion: '.left-container'
 });

ClusterMonitor.addInitializer(function(data) {
  // var contacts = new ContactManager.Collections.Contacts(),
  //     router = new ContactManager.Router(),
  //     controller = new ContactManager.Controller({
  //       contacts: contacts,
  //       router: router,
  //       mainRegion: this.mainRegion
  //     });

    var clusters = new ClusterMonitor.Collections.ClusterCollection(),
        router = new ClusterMonitor.Router(),
        controller = new ClusterMonitor.ClusterController({
            clusters: clusters,
            router: router,
            mainRegion: this.mainRegion
        });


  router.processAppRoutes(controller, {
    // 'clusters': 'showClusters'
  });


    //controller.close();
    
});

ClusterMonitor.on('initialize:after', function(options){
  if (Backbone.history){
    Backbone.history.start();
  }
});
