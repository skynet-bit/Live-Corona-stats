

(function () {

  var instructions = $("#instructions").html() || '';

  $("#mainBody").append("<div id='inst-body'><span id='inst-handle' class='insta' style='float:right'>Instructions</span><span id='timer' class='insta' style='float:left'><time>00:00:00</time></span></div>");

  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  if (windowWidth < 600) {
    $("#inst-body").css({ "width": "100%", "margin-left": "0", "font-size": "12px" });
  } else {
    $("#inst-body").css({ "width": "100%", "margin-left": "0%", "font-size": "15px" });
  }

  $(window).on('resize', function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    if (windowWidth < 600) {
      $("#inst-body").css({ "width": "100%", "margin-left": "0", "font-size": "12px" });
    } else {
      $("#inst-body").css({ "width": "100%", "margin-left": "0%", "font-size": "15px" });
    }
  })

  $("#inst-body").css({ "position": "absolute", "top": "0", "z-index": "5" });
  $(".insta").css({ "padding": "2px", "border-radius": "0 0 5px 5px", "cursor": "pointer", "background-color": "#fff", "box-shadow": "0 5px 3px -3px #777" });

  if (instructions == '') {
    $("#inst-handle").hide();
  }

  $('body').append('<button type="button" class="btn btn-info btn-lg instructions" data-toggle="modal" data-target="#myModalInstructions" style="display:none">Open Modal</button><div class="modal fade" id="myModalInstructions" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Instructions</h4></div><div class="modal-body"><p>' + instructions + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

  $("#myModalInstructions .modal-body").css({ "text-align": "center" });
  $("#myModalInstructions .modal-body img").css({ "width": "50%", "height": "auto", "border": "1px solid lightgray", "padding": "2px", "border-radius": "5px" });
  if (windowWidth < 600) {
    $("#myModalInstructions .modal-body img").css({ "width": "100%" });
  }

  $("#inst-handle").click(function () {
    $(".instructions").trigger('click');
  })

  var seconds = sessionStorage.getItem("seconds") || 0;
  var minutes = sessionStorage.getItem("minutes") || 0;
  var hours = sessionStorage.getItem("hours") || 0;
  var t;

  var h1 = document.getElementById("timer");
  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    sessionStorage.setItem("seconds", seconds);
    sessionStorage.setItem("minutes", minutes);
    sessionStorage.setItem("hours", hours);

    timer();
  }

  function timer() {
    t = setTimeout(add, 1000);
  }

  timer();

  // Note Id CSS

  $("#noteId").attr("style", 'position:relative;float:right;color:black;font-size:15px;background-color:white;padding:2px;border-radius:3px 0 0 0;');

  // Custom Colors Array
  
  panelColors = {"1": "#f1b0f0","2": "#ffadd9", "3": "#ffb2b6", "4": "#ffc391", "5": "#ffdc75", "6": "#f9f871", "7": "#D1B0F1", "8": "#B0DBF1", "9": "#B0F1EA", "10": "#FEF997"};
  backgroundColors = ["#FFD8DC", "#FFD8EF", "#FBD8FF", "#E0D8FF", "#C7FAFE", "#C7FED0", "#DDFEC7", "#FEC9C7"];

  var cc = shadeColor(getRandom(backgroundColors, 1)[0], -12)

  $('body').css({  "background-color": cc})

  // Disable Text selection on drag

  $("<style>* { -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: -moz-none; -o-user-select: none; user-select: none;} input { -webkit-user-select: text; -khtml-user-select: text; -moz-user-select: -moz-text; -o-user-select: text; user-select: text;} textarea { -webkit-user-select: text; -khtml-user-select: text; -moz-user-select: -moz-text; -o-user-select: text; user-select: text;}</style>").appendTo("body");

  $('body').append('<a style="display:none" id="reinforceAudio"></a>');

  // Line Height binding for different languages

  if($("#ankiTags").length > 0){
    var ankiTags = $("#ankiTags").html();
    if(ankiTags == 'hindi' || ankiTags == 'kannada'){
      $(".panel").css({"line-height": "1.6 !important"});
    }else if(ankiTags == 'french' || ankiTags == 'german'){
      $(".panel").css({"line-height": "1.4 !important"});
    }
  }

})();

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function errorAudio(aud) {
  var errorAudio = ['oh no.mp3', 'youre-almost-there.wav'];
  errorAudio = aud || getRandom(errorAudio, 1);
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loc = window.location.pathname;
    loc = loc.replace("__viewer__.html", "");
    $("#reinforceAudio").attr("href", "playsound:file://" + loc + errorAudio + "");
  } else {
    $("#reinforceAudio").attr("href", 'javascript:py.link("ankiplay' + errorAudio + '")');
  }
  window.location.href = $("#reinforceAudio").attr("href");
}
function correctAudio(aud) {
  var correctAudio = ['good_beep1.wav', 'good_beep2.wav', 'good_beep3.wav'];
  correctAudio = aud || getRandom(correctAudio, 1);
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loc = window.location.pathname;
    loc = loc.replace("__viewer__.html", "");
    $("#reinforceAudio").attr("href", "playsound:file://" + loc + correctAudio + "");
  } else {
    $("#reinforceAudio").attr("href", 'javascript:py.link("ankiplay' + correctAudio + '")');
  }
  window.location.href = $("#reinforceAudio").attr("href");
}

function coinFlip() {
  $('body').append('<div class="score coinRemove"><div class="coinn"><div class="star"></div><span class="currency">0</span></div></div>');
  var mainScore = sessionStorage.getItem('mainScore') || 0;
  $(".coinn .currency").html(mainScore);
  $("#score").css({ "margin-left": ($(".score").width() - $("#score").width()) / 2 + "px" });

  $('body').append("<div class='coin coinRemove'><div class='star'></div><span class='currency'>&#10025;</span></div>");
  var winAudio = ['come-on-1.wav', 'nice-work.wav', 'you-got-it-2.wav', 'nice-work.wav', 'you-got-it-2.wav'];
  winAudio = getRandom(winAudio, 1);
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loc = window.location.pathname;
    loc = loc.replace("__viewer__.html", "");
    $("#reinforceAudio").attr("href", "playsound:file://" + loc + winAudio + "");
  } else {
    $("#reinforceAudio").attr("href", 'javascript:py.link("ankiplay' + winAudio + '")');
  }
  var elemLeft = $(window).width() / 2 - 50;
  var elemTop = $(window).height() - 100;
  $(".coin").css({ "position": "absolute", "top": "100%", "left": elemLeft + "px" });
  $(".coin").addClass("flipCoin");
  $(".coin").animate({ "top": "40%" }, 1200);
  setTimeout(function () {
    window.location.href = $("#reinforceAudio").attr("href");
  }, 200)
  setTimeout(function () {
    $(".score").animate({ "left": "-2px" }, 1000);
    $(".coin").removeClass('flipCoinMov').removeClass('flipCoin');
    $(".coin").css({ "top": "40%" });
    setTimeout(function () {
      $(".coin").addClass("flipCoin");
      var tt = $(".coinn").offset();
      $(".coin").animate({ "top": tt.top + "px", "left": tt.left + "px" }, 1200);
      setTimeout(function () {
        $(".coin").remove();
        $(".coinn .currency").html(parseInt($(".coinn .currency").html()) + 1);
        sessionStorage.setItem('mainScore', $(".coinn .currency").html());
        reinforcement();
      }, 1200)
    }, 1200);
  }, 1200);
}

function reinforceAudio(aud) {
  var correctAudio = ['come-on-1.wav', 'nice-work.wav', 'you-got-it-2.wav', 'nice-work.wav', 'you-got-it-2.wav'];
  correctAudio = aud || getRandom(correctAudio, 1);
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    var loc = window.location.pathname;
    loc = loc.replace("__viewer__.html", "");
    $("#reinforceAudio").attr("href", "playsound:file://" + loc + correctAudio + "");
  } else {
    $("#reinforceAudio").attr("href", 'javascript:py.link("ankiplay' + correctAudio + '")');
  }
  window.location.href = $("#reinforceAudio").attr("href");
}

function popUpNotify(msg, typ) {
  $('#notify').remove();
  $("body").append("<div class='notify font_3' id='notify'>" + msg + "</div>");
  var winWidth = $(window).width();
  var tt = winWidth - $("#notify").outerWidth();
  $("#notify").css({ "margin-left": "" + tt / 2 + "px" });
  $('#notify').addClass('bounce-in-top');
  var typ = typ || '';
  $("#wrapper").css({ "opacity": "0.3", "pointer-events": "none" });
  $("#footer").css({ "opacity": "0.3", "pointer-events": "none" });
  if (typ == '') {
    setTimeout(function () {
      $("#notify").removeClass("bounce-in-top").addClass("flip-out-hor-top");
      $("#wrapper").css({ "opacity": "1", "pointer-events": "auto" })
      $("#footer").css({ "opacity": "1", "pointer-events": "auto" })
    }, 3000)
  }
  $("#notify").addClass("bounce-out-top");
  setTimeout(function () {
    $("#notify").addClass("bounce-out-top");
    $("body").css({ "opacity": "1", "backface-visibilty": "none" });
  }, 2500);
}

// Clean Text

function wrapText(sen, font) {
  sen = $('<div />').html(sen).find('span').contents().unwrap().end().end().html();
  sen = $('<div />').html(sen).find('div').contents().unwrap().end().end().html();
  sen = sen.replace('<!--anki-->', '');
  font = font || '';
  if (font == '') {
    sen = $('<div />').html(sen).find('font').contents().unwrap().end().end().html();
  }
  sen = sen.replace(/&nbsp;/g, ' ');
  sen = sen.replace(/ +/g, ' ');
  return sen;
}

// Clean Audio
function wrapAudio(sen) {
  var span = document.createElement('span');
  span.innerHTML = sen;
  var sen = span.textContent || span.innerText;
  sen = sen.replace(/<!--anki>/, '');
  sen = $('<div />').html(sen).find('span').contents().unwrap().end().end().html();
  sen = $('<div />').html(sen).find('div').contents().unwrap().end().end().html();
  if (sen != '') {
    if (sen[0] == ' ') {
      sen = sen.slice(1);
    }
  }
  sen = sen.replace(/&nbsp;/g, '');
  sen = sen.replace(/ +/g, '');
  return sen;
}

// Shuffle array function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// preloader with css spinner

function preLoader(elem) {
  $(".preLoader").remove();
  elem.append('<div class="preLoader"><div class="preLoader-overlay"></div><div class="preLoader-spinner"></div></div>');
}

// Check for line height

(function ($) {
  $.fn.checkLineHeight = function () {
    console.log('Check Line Height removed..')
  }
})($);

(function ($) {
  $.fn.modalImage = function () {
    $(this).find('img').click(function () {
      var srcc = $(this).attr('src');
      if (srcc != '_inline_replay_button.png') {
        $('#modalDynamic').remove();
        $('body').append('<div id="modalDynamic" class="i-modal"><span class="i-close">&times;</span><img class="i-modal-content" id="modalImg"></div>');
        $("#modalDynamic").show();
        $("#modalImg").attr('src', srcc);
        $("#modalDynamic").click(function () {
          $("#modalDynamic").hide();
          $("#modalDynamic").remove();
        })
      }
    })

  }
})($);

// Dummy functions

function correctAppr(){
  console.log('');
}
function wrongAppr(){
  console.log('');
}

function shadeColor(color, percent) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}