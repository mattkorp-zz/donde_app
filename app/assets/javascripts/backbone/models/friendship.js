App.Models.Friendship = Backbone.Model.extend({
  urlRoot: "friendships",
  defaults: {
      "username"              : "",
      "email"                 : "",
      "password"              : "",
      "password_confirmation" : "",
      "latitude"              : "",
      "longitude"             : "",
      "active"                : "false"
  },
  initialize: function(attributes, options){
    //this.set("id", this.attributes.id);
    //this.getFriendInfo();
  }
});
