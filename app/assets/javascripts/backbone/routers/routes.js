App.Router = Backbone.Router.extend({
  routes: {
    ""        : "index",
    "friends" : "listFriendships",
    "where/:id"   : "findFriend"
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
    App.friendList = new App.Views.Friendships({ model: App.user });
  },
  findFriend: function(id) {
    // get friend data to update
    App.friend = new App.Models.Friendship({id: id});
    this.getFriendInfo();
    // its show time!
    App.findFriend = new App.Views.Where();
  },
  // this could be int eh freind model if you have the id
  getFriendInfo: function(){
    // authenticate user with login fields
    $.ajax({
      url   : "/users/" + 9,
      async : true,
      type  : "get",
      data  : {}
        // username: this.get('username'),
        // password: this.get('password')
    }).done(function(response){
      debugger;

      App.friend.set(response);
      // Not updating enough, maybe look at again if performance issue
      // App.friend.sync("update", App.friend, {
      //   wait: false,
      //   success: function(model, response) {
      //   console.log("friend updated success");
      //   },
      //   error: function(model, error) {
      //   console.log("Cannot update friend");
      //   }
      // });
      // Continually update friend data
      setInterval(function() {
        App.friend.fetch()
      }, 10000);
      return true;
    });
  }
});