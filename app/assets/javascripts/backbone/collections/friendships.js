App.Collections.Friendships = Backbone.Collection.extend({
  model: App.Models.User,
  url: function() {
   return App.user.url() + "/friendships"
  }
});