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
  initialize: function(){
  }
});
