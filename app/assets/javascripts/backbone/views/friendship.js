App.Views.Friendships = Backbone.View.extend({
  el: "#friendships_list",
  events: {
    "submit form" : "newFriend"
  },
  initialize: function(args) {
    // this.user_id
    //this.username = $("#username");
    this.render();
  },
  show: function() {
    this.$el.show();
  },
  render: function(){
    //var userModel    = new App.Models.User();
    this.friendships = new App.Collections.Friendships();
    var myFriends    = this.friendships;
    var friendView     = this;
    this.friendships.fetch({
      success: function(model) {
        console.log("fetch success");
        console.log(myFriends.toJSON());
        var html = HandlebarsTemplates['friendships/friendships']({ friendships: myFriends.toJSON()});
        console.log(html);
        friendView.$el.html(html);
        friendView.addEvents(myFriends);
      }
    });

    // var self = this;
    // this.model.somecollection.forEach(function(c) {
    //     var view = new ChildView({ model: c });
    //     self.el.append(view.render().el);
    // });
    // return this;

  },
  newFriend: function(e) {
    // create model for new user, get email from input
    e.preventDefault();
    var newUser = new App.Models.User();
    newUser.set( this.getAttributes() );
    // send user, auth, and new email
    // or just send
    // send by ajax or bb to  server?

    // add user to contacts
  },
  getAttributes: function() {
    return {
      email: this.email.val(),
    }
  },
  addEvents: function(friends) {
    debugger;
  }
});
