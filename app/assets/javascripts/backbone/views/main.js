App.Views.Main = Backbone.View.extend({
  el: "#main",
  events: {
    "click #signup_button" : "showForm",
    "click #login_button"  : "showLogin"
  },
  initialize: function(){
    this.signup = new App.Views.Signup({ model: this.model });
    this.login  = new App.Views.Login({ model: this.model });
  },
  showForm: function(e){
    this.signup.show("slow");
    this.login.$el.hide("slow");
  },
  showLogin: function(e){
    this.login.show("slow");
    this.signup.$el.hide("slow");
  }
});


// App.main.model.attributes
// App.main.model.validationError
// .validate()
// .save()
// App.main.login
// this.getAttributes()
// this.model.attributes
// App.main.model.get('email')