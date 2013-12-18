App.Views.Friendships = Backbone.View.extend({
  el: "#friendships_list",
  events: {
    "submit form"           : "newFriend",
    "click a.friend-anchor" : "chooseFriend"
  },
  initialize: function(args) {
    this.render();
  },
  show: function() {
    this.$el.show();
  },
  render: function(){
    this.friendships   = new App.Collections.Friendships();
    var myFriends      = this.friendships;
    var friendView     = this;
    this.friendships.fetch({
      success: function(model) {
        var html = HandlebarsTemplates['friendships/friendships']({ friendships: myFriends.toJSON()});
        friendView.$el.html(html);
      }
    });

  },
  newFriend: function(e) {
    // create model for new user, get email from input
    e.preventDefault();
    var newUser = new App.Models.User();
    newUser.set( this.getAttributes() );
    // add user to contacts
    // TODO
  },
  getAttributes: function() {
    return {
      email: this.email.val(),
    }
  },
  chooseFriend: function(e) {
    // TODO add friend id or username to the string
    this.$el.hide();
    $('div.spinner').show();
    App.router.navigate( "where", { trigger: true });
  }
});

