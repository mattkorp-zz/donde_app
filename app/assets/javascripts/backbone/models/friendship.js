App.Models.Friendship = Backbone.Model.extend({
  urlRoot: "/users",
  defaults: {
      "username"              : "",
      "email"                 : "",
      "password"              : "",
      "password_confirmation" : "",
      "latitude"              : "",
      "longitude"             : "",
      "active"                : "false"
   // }
  },
  initialize: function(attributes, options){
    this.set("id", this.attributes.id);
    debugger;
    this.getFriendInfo();
  },
  getFriendInfo: function(){
    // authenticate user with login fields
    $.ajax({
      url   : "/users/" + this.get("id"),
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
