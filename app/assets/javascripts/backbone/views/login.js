App.Views.Login = Backbone.View.extend({
  el: "#login_form",
  events: {
    "click #submit-login" : "loginUser"
  },
  initialize: function(){
    this.username = $("#username");
    this.password = $("#password");
  },
  show: function(){
    this.$el.show();
  },
  loginUser: function(e){
    e.preventDefault();
    // authenticate user and start tracking
    this.model.set( this.getAttributes() );
    this.model.authenticate();
    this.model.geoLocate();
    // now send to contact list
    this.$el.hide();
    App.router.navigate( "friends", { trigger: true } );
  },
  getAttributes: function(){
    return {
      username: this.username.val(),
      password: this.password.val()
    }
  }
});
