App.Views.Where = Backbone.View.extend({
  el: '#where',
  initialize: function() {
    this.myLat        = 0.0;
    this.myLon        = 0.0;
    this.friendLat    = 0.0;
    this.friendLon    = 0.0;
    this.initDistance = 0.0;
    this.render();
  },
  render: function() {
    var whereView = this;
    this.setBindings();
  },
  setBindings: function() {
    this.listenTo(App.user, "change", this.makeCalcs);
    this.listenTo(App.friend, "change", this.makeCalcs);
  },
  makeCalcs: function() {
    this.myLat        = App.user.get("latitude");
    this.myLon        = App.user.get("longitude");
    this.friendLat    = App.friend.get("latitude");
    this.friendLon    = App.friend.get("longitude");
    this.getPoints();
    if (this.initDistance === 0) {
      this.initDistance = this.updateDistance();
    } else {
      this.updateDistance();
    }
    this.updateBearing();
    this.updatePage();
    $('div.spinner').hide();
  },
  updatePage: function() {
      this.$el.html($('<p>').append(this.distance, "  ").append(this.bearing));
  },
  getPoints: function() {
    this.myPt     = new LatLon(this.myLat, this.myLon);
    this.friendPt = new LatLon(this.friendLat, this.friendLon);
  },
  updateDistance: function() {
    var feet = 3280;  // km to ft
    this.distance = this.myPt.distanceTo(this.friendPt) * feet;
    return this.distance;
  },
  updateBearing: function() {
    this.bearing = this.myPt.bearingTo(this.friendPt);    // degrees clockwise from north
  }
})