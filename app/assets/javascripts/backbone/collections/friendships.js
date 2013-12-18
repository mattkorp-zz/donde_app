App.Collections.Friendships = Backbone.Collection.extend({
  model: App.Models.Friendship,
  url: function() {
   return  "friendships/" + App.user.get("id");
  }
});