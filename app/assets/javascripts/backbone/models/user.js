App.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  defaults: {
    "username"              : "",
    "email"                 : "",
    "password"              : "",
    "password_confirmation" : "",
    "latitude"              : "",
    "longitude"             : "",
    "active"                : "false"
  },
  initialize: function(){
  },
  geoLocate: function(){
    //start watching position after initialization
    if  (navigator.geolocation) {
      // timeout if value new location in 10 seconds
      var timeoutVal = 5 * 1000;
      // set location watch
      App.user.watchID = navigator.geolocation.watchPosition(
        App.user.watchPositionCallback,
        App.user.watchPostionError,
        {
          enableHighAccuracy : true,
          maximumAge         : 0,
          timeout            : timeoutVal
        });

    } else {
      alert("geolocation not available")
    }
  },
  watchPositionCallback: function(position){
    // if geo successful, update lat/long and add a listener
    App.user.set("latitude", position.coords.latitude);
    App.user.set("longitude", position.coords.longitude);
    App.user.listenTo(App.user, "change:latitude", App.user.updateLatLon);
  },
  watchPositionError: function(error) {
    // if geo unsuccessful...
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
  },
  updateLatLon: function() {
    // Update users Lat/Lon
     this.save( {
      wait: false,
      success: function(model, response){
        // User updated successfully
        console.log("User updated success");
      },
      error: function(model, error){
        console.log("Cannot update user");
      }
    });
  },
  // attrs is model attributes
  // options are what's passed from save or set
  validate: function(attrs, options){
    var errors = [];

    // if (attrs.password !== attrs.password_confirmation) {
    //   errors.push("Passwords must match");
    // }
    if(errors.length > 0) {
      return errors;
    }
  },
  authenticate: function(){
    // authenticate user with login fields
    var user = this;
    $.ajax({
      url   : "/login",
      async : false,
      type  : "post",
      data  : {
        username: this.get('username'),
        password: this.get('password')
      }
    }).done(function(response){
      user.set(response);
      return true;
    });
  },
  cleanup: function() {
    window.onbeforeunload = function(e) {
      App.user.logoff();
    };
  },
  logoff: function() {
    // destroy session and logout of system
    var user = this;
    $.ajax({
      url   : "/logout",
      async : true,
      type  : "POST",
      data  : {
        username: this.get('username'),
        password: this.get('password')
      }
    }).done(function(response){
      return true;
    });
  },
  getFriendInfo: function(){
    // authenticate user with login fields
    var user = this;
    $.ajax({
      url   : "/users/" + this.get("id"),
      async : false,
      type  : "get",
      data  : {}
        // username: this.get('username'),
        // password: this.get('password')
    }).done(function(response){
      user.set(response);
      // Not updating enough, maybe look at again if performance issue
      // App.friend.sync("update", App.friend, {
      //   wait: false,
      //   success: function(model, response) {
      //   console.log("friend updated success");
      //   },
      //   error: function(model, error) {
      //   console.log("Cannot update friend");
      //   }
      // });
      // Continually update friend data
      setInterval( function() { user.fetch(); }, 5000 );
      return true;
    });
  }
});
