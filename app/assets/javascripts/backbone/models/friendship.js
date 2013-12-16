App.Models.Friendship = Backbone.Model.extend({
  urlRoot: "friendship",
  defaults: {
    username: "",
    status: ""
  }
});