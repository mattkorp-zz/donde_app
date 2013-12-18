App.Router = Backbone.Router.extend({
  routes: {
    ""          : "index",
    "friends"   : "listFriendships",
    "where/:id" : "findFriend"
  },
  initialize: function() {
    Backbone.history.start();
  },
  index: function(){
    App.user = new App.Models.User();
    App.main = new App.Views.Main({ model: App.user });
  },
  listFriendships: function() {
    // get user info in view
    App.friendList = new App.Views.Friendships();
  },
  findFriend: function(id) {
    // get friend data to update
    App.friend = new App.Models.User({id: id});
    App.friend.getFriendInfo();
    App.findFriend = new App.Views.Where();
  }
});
