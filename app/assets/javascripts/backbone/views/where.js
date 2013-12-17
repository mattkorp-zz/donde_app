App.Views.Where = Backbone.View.extend({
  el: '#where',
  initialize: function() {
    this.myLat        = App.user.get("latitude");
    this.myLon        = App.user.get("longitude");
    this.friendLat    = App.friend.get("latitude");
    this.friendLon    = App.friend.get("longitude");
    this.initDistance = 0.0;

    this.render();
  },
  render: function() {
    $('div.spinner').show();
    var whereView = this
    setInterval(function() {
      console.log("again");
      whereView.makeCalcs();
      whereView.$el.html($('<p>').append(whereView.distance, "  ").append(whereView.bearing));
    },10000);
  },
  makeCalcs: function() {
    this.getPoints();
    if (this.initDistance === 0) {
      this.initDistance = this.updateDistance();
    } else {
      this.updateDistance();
    }
    this.updateBearing();
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