// grab signup form and unhide
// initialize sub view of main and display
App.Views.Signup = Backbone.View.extend({
  el: "#signup_form",
  events: {
    "submit form" : "createUser"
  },
  initialize: function() {
    this.username              = $("#user_username")
    this.email                 = $("#user_email");
    this.password              = $("#user_password");
    this.password_confirmation = $("#user_password_confirmation");
    // ??? What is invalid mean here
    this.listenTo(this.model, "invalid", this.displayErrors);
    this.errors = $("#errors");
  },
  show: function(e) {
    this.$el.show();
  },
  hide: function(e) {
    this.$el.hide();
  },
  createUser: function(e) {
    e.preventDefault();
    this.model.set( this.getAttributes() );
    if (this.model.isValid()) { // this checks validity twice( once in save)
      this.model.save(); // is that necessary or will save send back errors?

      App.router.navigate("/friends", { trigger: true });
    } else {
      console.log("Cannot create user.")
    }
  },
  // crate hash to pass across
  getAttributes: function() {
    return {
      user: {
        username              : this.username.val(),
        email                 : this.email.val(),
        password              : this.password.val(),
        password_confirmation : this.password_confirmation.val()
      }
    }
  },
  displayErrors: function(){
    this.errors.text(this.model.validationError.join(" "));
  }
});
