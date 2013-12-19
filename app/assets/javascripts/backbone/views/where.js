App.Views.Where = Backbone.View.extend({
  el: '#where',
  initialize: function() {
    this.myLat        = 0.0;
    this.myLon        = 0.0;
    this.friendLat    = 0.0;
    this.friendLon    = 0.0;
    this.initDistance = 0.0;
    this.bgColors     = {};
    this.fontColor    = "#FFF";
    this.render();
  },
  render: function() {
    var whereView = this;
    this.setBindings();
  },
  setBindings: function() {
    this.listenTo(App.user, "change:latitude", this.makeCalcs);
    this.listenTo(App.friend, "change:latitude", this.makeCalcs);
  },
  makeCalcs: function() {
    this.myLat        = App.user.get("latitude");
    this.myLon        = App.user.get("longitude");
    this.friendLat    = App.friend.get("latitude");
    this.friendLon    = App.friend.get("longitude");

    this.getPoints();

    if (this.initDistance === 0) {
        this.initDistance = this.updateDistance();
      if (this.initDistance !== 0) {
          this.initBGColor();
      }
    } else {
      this.updateDistance();
    }
    $('div.spinner').hide();
    this.updateBearing();
    this.updatePage();
    this.updateBGColor();
  },
  initBGColor: function() {
    var BLUE_TO_RED = [ "#0BF",
      "#1BE","#2AD","#3AC","#49B","#59A",
      "#689","#788","#877","#976","#A65",
      "#B64","#C53","#D52","#E41","#F40" ];
    // There are 16 levels of background colors from BLUE_TO_RED
    // map these from initial distance stepped down to to "sync^"
    // find step quantities and match color steps to object
    var colorObj = this.bgColors;
    var keyDist = Math.floor(this.initDistance);
    var step = Math.floor(this.initDistance / BLUE_TO_RED.length);
    // FIX BLUE_TO_RED = [Object Array] not Array?
    _.each(BLUE_TO_RED, function(color, count){
      colorObj[keyDist - (step*(count-1))] = color;
    });
  },
  updatePage: function() {
    $pointer = $('<img>')
        .addClass("heading")
        .css({
              '-webkit-transform':'rotate(' + this.bearing + 'deg)',
                 '-moz-transform':'rotate(' + this.bearing + 'deg)',
                   '-o-transform':'rotate(' + this.bearing + 'deg)',
                  '-ms-transform':'rotate(' + this.bearing + 'deg)'
              }).attr("src","images/pointer.svg");

    // <50ft font color turns green
    if (this.distance < 50) {
      this.fontColor = "#292";
    }
    $distance = $('<h2>')
      .addClass( "distance" )
      .text( Math.round(this.distance) + " Feet" )
      .attr( "style", this.fontColor );

    this.$el.html($pointer).append($distance);
  },
  updateBGColor: function() {
    // find nearest key value to background number
    var closest = null;
    $.each(this.bgColors, function(index, color) {
      if (closest == null || Math.abs( index - this.distance ) < Math.abs( closest - this.distance )) {
        closest = index;
      }
    });

     $('body').css("background-color", this.bgColors[closest]);
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
});