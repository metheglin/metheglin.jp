var root      = Function("return this")();

// require("../support")
var $   = require("jquery");
var _   = require("lodash");
require('waypoints/lib/noframework.waypoints.js')
root.$  = $;
root._  = _;

$(function(){
  $("#wall-left").append(accumulateBricks())
  $("#wall-right").append(accumulateBricks())

  // var top = $('#box1').offset().top; //初期値を取得
  // $(window).scroll(function() {
  //     var value = $(this).scrollTop(); //スクロールの値を取得
  //     $('#scrollValue').text(value);
 
  //     $('#box1').css('top', top + value / 2);
  //     $('#box2').css('top', top + value / 4);
  //     $('#box3').css('top', top + value / 6);
  //     $('#box4').css('top', top + value / 8);
  // });

  var waypoint2 = new Waypoint({
    element: document.getElementById('section-2'),
    handler: function(direction) {
      if ( direction == "up" ) {
        setBrickSection("brick-section-1")
      } else {
        setBrickSection("brick-section-2")
      }
    },
    offset: '75%'
  })
  var waypoint3 = new Waypoint({
    element: document.getElementById('section-3'),
    handler: function(direction) {
      if ( direction == "up" ) {
        setBrickSection("brick-section-2")
      } else {
        setBrickSection("brick-section-3")
      }
    },
    offset: '75%'
  })
  var waypoint3 = new Waypoint({
    element: document.getElementById('section-4'),
    handler: function(direction) {
      if ( direction == "up" ) {
        setBrickSection("brick-section-3")
      } else {
        setBrickSection("brick-section-4")
      }
    },
    offset: '75%'
  })
});

var setBrickSection = function(className) {
  $(".brick").
    removeClass("brick-section-1").
    removeClass("brick-section-2").
    removeClass("brick-section-3").
    removeClass("brick-section-4").
    addClass(className)
}
var accumulateBricks = function() {
  var rowNum = 70
  var colNum = 9
  var primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 
    53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 
    109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 
    173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 
    233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 
    293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 
    367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 
    433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 
    593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 
    659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 
    743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 
    827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 
    911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997
  ]
  var tris = [
    1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 
    120, 136, 153, 171, 190, 210, 231, 253, 276, 300, 325, 
    351, 378, 406, 435, 465, 496, 528, 561, 595, 630, 666, 
    703, 741, 780, 820, 861, 903, 946, 990, 
  ]
  var $wall = $('<div class="wall-container"></div>')
  for ( var i=0; i<rowNum; i++ ) {
    var $wallrow = $('<div class="wall-row"></div>')
    for ( var j=0; j<colNum; j++ ) {
      var serial = ((i*colNum) + j) + 1
      if ( tris.includes(serial) && primes.includes(serial) ) {
        $wallrow.append('<div class="brick brick-xs"></div>')
      } else if ( tris.includes(serial) ) {
        $wallrow.append('<div class="brick brick-sm"></div>')
      } else if ( primes.includes(serial) ) {
        $wallrow.append('<div class="brick brick-md"></div>')
      } else {
        $wallrow.append('<div class="brick"></div>')
      }
    }
    $wall.append($wallrow)
  }
  return $wall
}