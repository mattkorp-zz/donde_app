App.Collections.Friendships = Backbone.Collection.extend({
  model: App.Models.User,
  url: function() {
    // return "/friendships/" + App.user.get("id");
   return App.user.url() + "/friendships"
  },
  initialize: function() {
   // this.set({ id: App.user.get("id") });
  }
});