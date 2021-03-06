var curState = "collection";

var blink;
var scrollUpAnim;
var scrollDownAnim;
var scrollLeftAnim;
var scrollRightAnim;
var darkenBackground;
var detailSlideRight;
var detailSlideUp;
var detailFadeIn;
var highlightFadeIn;
var removeDetail;
var removeRunway;
var runwayFade;
var releaseScroll;
var linkExit;
var closeups = [false, false, false, false];

//define animations for later use
//start playing the runway scroll in the background for a smoother transition later
//disable scrolling
function setUp(){
  defineAnime();
  document.getElementById('nav0').style.textDecoration = 'underline';
  $('body').addClass('stop-scrolling');

  blink = anime({
    targets: '#logo',
    easing: 'linear',
    direction: 'alternate',
    opacity: 0,
    loop: true,
    duration: 1000
  });
}

//transition from welcome page to collection page (happens only once)
function enter(){
  document.getElementById('logo').style.opacity = 1;
  blink.pause();

  var repositionLogo = anime({
    targets: '#logo',
    easing: 'easeOutExpo',
    left: ['45%', '3%'],
    bottom: '30px',
    duration: 2500
  });

  var fadeBackdrop = anime({
    targets: '#backdrop',
    opacity: 0,
    easing: 'easeOutExpo',
    duration: 1500,
    complete: function(anim) {
      document.getElementById('backdrop').style.display = 'none';
    }
  });

  var arrowExit = anime({
    targets: '#arrow',
    opacity: 0,
    easing: 'easeOutExpo',
    duration: 1500,
    complete: function(anim) {
      document.getElementById('arrow').style.display = 'none';
    }
  });
}

//define all the animations shared across functions
function defineAnime(){
  defineAutoup();
  defineAutodown();

  darkenBackground = anime({
    targets: 'body',
    backgroundColor: '#1E2531',
    easing: 'easeInOutSine',
    direction: 'reverse',
    duration: 1000,
    autoplay: false
  });

  detailSlideRight = anime({
    targets: '.subTitle',
    translateX: [-280, 0],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  detailSlideUp = anime({
    targets: '.detail-content',
    translateY: [200, 0],
    opacity: [0, 1],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    delay: 500,
    duration: 1000,
    autoplay: false
  });

  detailFadeIn = anime({
    targets: '#detailmain',
    opacity: [0, 1],
    easing: 'linear',
    direction: 'reverse',
    delay: 800,
    duration: 1000,
    autoplay: false
  });

  runwayFade = anime({
    targets: '#collection',
    opacity: [1, 0],
    easing: 'easeInOutSine',
    direction: 'reverse',
    duration: 1200,
    autoplay: false
  });

  linkExit = anime({
    targets: '#nav3',
    translateY: [0, -50],
    opacity: 0,
    direction: 'reverse',
    duration: 1000,
    autoplay: false
  });

  highlightFadeIn = anime({
    targets: '#highlight',
    opacity: [0, 1],
    easing: 'easeInSine',
    direction: 'reverse',
    duration: 1200,
    autoplay: false
  });

  proflieEnter = anime({
    targets: '#artist',
    opacity: [0, 1],
    translateX: ['50%', 0],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    delay: 600,
    duration: 1300,
    autoplay: false
  });

  //use the delay property to time when to remove element from the page
  removeDetail = anime({
    targets: '.detail',
    delay: 400,
    autoplay: false,
    complete: function(anim) {
      document.getElementById('detail').style.display = 'none';
    }
  });

  removeRunway = anime({
    targets: '.collection',
    delay: 500,
    autoplay: false,
    complete: function(anim) {
      document.getElementById('collection').style.display = 'none';
    }
  });

  //used to delay "enable scrolling" as it casues glitch in the animation
  releaseScroll = anime({
    targets: '.name',//dummy target
    delay: 200,
    autoplay: false,
    complete: function(anim) {
      $('body').removeClass('stop-scrolling');
    }
  });
}

//defines the bahavior of the left runway
function defineAutoup(){
  var runtime = 80000;
  var maxscroll = document.getElementById('autoup').offsetHeight;
  var imgHeight = document.getElementById('identifier1').offsetHeight;
  var offset = maxscroll - imgHeight*1.5;

  scrollUpAnim = anime({
    targets: '#autoup',
    translateY: [-imgHeight, -offset],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    duration: runtime
  });
}

//defines the bahavior of the right runway
function defineAutodown(){
  var runtime = 80000;
  var maxscroll = document.getElementById('autodown').offsetHeight;
  var imgHeight = document.getElementById('identifier2').offsetHeight;
  var offset = maxscroll - imgHeight*0.9;

  scrollDownAnim = anime({
    targets: '#autodown',
    translateY: [-offset, -300],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    duration: runtime
  });
}

// see if the current state of the page has changed --> if transitions need to be made
function stateValidator(newState) {
  if (curState !== newState){
    changeVlidator(newState);
  }
}

//handles what happens when users are proceeding to a new page
function changeVlidator (newState){
  if (curState == "collection"){
    if (newState == "detail"){
      document.getElementById('detail').style.display = 'initial';
      playDetailAnime("show");
      detailReverse();
    }
    if (newState == "highlight"){
      document.getElementById('highlight').style.display = 'initial';
      highlightFadeIn.play();
      highlightFadeIn.reverse();
    }
    if (newState == "artist"){
      document.getElementById('artist').style.display = 'inline-block';
      linkExit.reverse();
      linkExit.play();
      proflieEnter.play();
      proflieEnter.reverse();
    }
    runwayExit("hide");
    runwayFade.reverse();
    releaseScroll.restart();
  }

  if (curState == "detail"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      runwayFade.reverse();
      $('body').addClass('stop-scrolling');
    }
    if (newState == "artist"){
      document.getElementById('artist').style.display = 'inline-block';
      proflieEnter.play();
      proflieEnter.reverse();
      linkExit.reverse();
    }
    playDetailAnime("hide");
    detailReverse();
  }

  if (curState == "artist"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      runwayFade.reverse();
      linkExit.reverse();
      linkExit.play();
      $('body').addClass('stop-scrolling');
    }
    if (newState == "detail"){
      document.getElementById('detail').style.display = 'initial';
      playDetailAnime("show");
      linkExit.reverse();
      detailReverse();
    }
    proflieEnter.play();
    proflieEnter.reverse();
  }

  if (curState == "highlight"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      runwayFade.reverse();
      $('body').addClass('stop-scrolling');
    }
    if (newState == "detail"){
      document.getElementById('detail').style.display = 'initial';
      playDetailAnime("show");
      detailReverse();
    }
    if (newState == "artist"){
      document.getElementById('artist').style.display = 'inline-block';
      linkExit.reverse();
      linkExit.play();
      proflieEnter.play();
      proflieEnter.reverse();
    }
    highlightFadeIn.play();
    highlightFadeIn.reverse();
  }

  curState = newState;
  resetUnderline(curState);
}

//fades the runway and brings it back depending on the parameters
function runwayExit(state){
  runwayFade.play();

  if (state == "hide") {
    removeRunway.restart();
  }
}

//reverse animation
function detailReverse(){
  darkenBackground.reverse();
  detailSlideRight.reverse();
  detailSlideUp.reverse();
  detailFadeIn.reverse();
  linkExit.reverse();
}

function playDetailAnime(state){
  darkenBackground.play();
  detailSlideRight.play();
  detailSlideUp.play();
  detailFadeIn.play();
  linkExit.play();
  if (state == "hide") {
    removeDetail.restart();
  }
}

//check if we need to zoom in now or zoom out
function zoom(id){
  var w = $(window).width();

  //only enlarge photos if the devise size is greater than 768
  if (w > 768){
    var shrinked = false;

  //check if a img is already zoomed in
    for (var i = 0; i < 4; i++){
      var supposedId = "closeup" + i;
      if (closeups[i] === true){
        if (id === supposedId){
          defineShrink(id);
          closeups[i] = false;
          shrinked = true;
        }
      }
    }

    //zoom in on selected img
    if (shrinked == false){
      for (var i = 0; i < 4; i++){
        var supposedId = "closeup" + i;
        if (id === supposedId){
          defineZoom(id, i);
          closeups[i] = true;
        }
      }
    }
  }

}

function defineZoom(id, i){
  var target = "#" + id;

  if (i%2 == 0){
    var dir = 1;
  } else {var dir = -1};

  document.getElementById('overlay').style.display = 'initial';
  document.getElementById(id).style.zIndex = 1;
  //make sure the zoomed img is abover other imgs on the page


  var big = anime({
      targets: target,
      translateX: 200*dir,
      scale: [1.1, 1.5],
      easing: 'easeOutSine',
      duration: 300
    });

  //draken the view by bringing out the hidden overlay
  var darken = anime({
      targets: "#overlay",
      opacity: 0.8,
      easing: 'easeInOutSine',
      duration: 500
    });
}

function defineShrink(id){
  var target = "#" + id;

  var small = anime({
      targets: target,
      translateX: 0,
      zIndex: 0,
      scale: 1,
      easing: 'easeOutSine',
      duration: 300
    });

  //fade the overlay
  var lighten = anime({
      targets: "#overlay",
      opacity: 0,
      easing: 'easeInOutExpo',
      duration: 500,
      complete: function(anim) {
        document.getElementById('overlay').style.display = 'none';
      }
    });
}

function resetUnderline(curState){
  for (var i = 0; i < 3; i ++){
    document.getElementById('nav'+i).style.textDecoration = 'none';
  }

  if (curState == 'collection'){
    document.getElementById('nav0').style.textDecoration = 'underline';
  }
  if (curState == 'detail'){
    document.getElementById('nav1').style.textDecoration = 'underline';
  }
  if (curState == 'artist'){
    document.getElementById('nav2').style.textDecoration = 'underline';
  }
  if (curState == 'highlight'){
    document.getElementById('nav3').style.textDecoration = 'underline';
  }
}