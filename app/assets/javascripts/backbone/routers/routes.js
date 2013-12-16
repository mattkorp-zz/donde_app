App.Router = Backbone.Router.extend({
  routes: {
    ""            : "index",
    "friends"     : "listFriendships"
  },
  initialize: function(){
    Backbone.history.start();
  },
  index: function(){
    App.user = new App.Models.User();
    App.main = new App.Views.Main({ model: App.user });
  },
  listFriendships: function(){
    // get user info in view
     App.friendList = new App.Views.Friendships({ model: App.user });
  }
});