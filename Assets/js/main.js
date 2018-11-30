
// window.addEventListener('scroll', function() {
//   document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
// });

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
var linkExit;
var closeups = [false, false, false, false];

function setUp(){
  defineAnime();
  playRunwayAnime();
  document.getElementById('nav0').style.textDecoration = 'underline';
  $('body').addClass('stop-scrolling');

  blink = anime({
    targets: 'h1',
    easing: 'linear',
    direction: 'alternate',
    opacity: 0,
    loop: true,
    duration: 1000
  });
}

function enter(){
  document.getElementsByTagName('h1')[0].style.opacity = 1;
      blink.pause();

  var repositionLogo = anime({
    targets: 'h1',
    easing: 'easeOutExpo',
    left: ['45%', '3%'],
    bottom: 0,
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

function defineAnime(){
  defineAutoup();
  defineAutodown();

  darkenBackground = anime({
    targets: 'body',
    backgroundColor: '#1E2531',
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
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  removeDetail = anime({
    targets: '.detail',
    delay: 1500,
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

  runwayFade = anime({
    targets: '#collection',
    direction: 'reverse',
    opacity: [1, 0],
    easing: 'linear',
    duration: 500,
    autoplay: false
  });

  linkExit = anime({
    targets: '#nav3',
    translateY: -50,
    opacity: 0,
    direction: 'reverse',
    delay: 500,
    duration: 1500,
    autoplay: false
  });

  highlightFadeIn = anime({
    targets: '#highlight',
    opacity: [0, 1],
    direction: 'reverse',
    duration: 1000,
    autoplay: false
  });

  proflieEnter = anime({
    targets: '#artist',
    opacity: [0, 1],
    translateX: ['50%', 0],
    easing: 'easeInOutExpo',
    direction: 'reverse',
    duration: 1500,
    autoplay: false
  });
}

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
      proflieEnter.play();
      proflieEnter.reverse();
    }
    runwayExit("hide");
    runwayFade.reverse();
    $('body').removeClass('stop-scrolling');
  }

  if (curState == "detail"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      playRunwayAnime();
      runwayFade.reverse();
      $('body').addClass('stop-scrolling');
    }
    if (newState == "artist"){
      document.getElementById('artist').style.display = 'inline-block';
      proflieEnter.play();
      proflieEnter.reverse();
    }
    playDetailAnime("hide");
    detailReverse();
  }

  if (curState == "artist"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      playRunwayAnime();
      runwayFade.reverse();
      $('body').addClass('stop-scrolling');
    }
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
    proflieEnter.play();
    proflieEnter.reverse();
  }

  if (curState == "highlight"){
    if (newState == "collection"){
      document.getElementById('collection').style.display = 'initial';
      runwayExit("show");
      playRunwayAnime();
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
      proflieEnter.play();
      proflieEnter.reverse();
    }
    highlightFadeIn.play();
    highlightFadeIn.reverse();
  }

  curState = newState;
  resetUnderline(curState);
}

// see if the current state of the page has changed --> if transitions need to be made
function stateValidator(newState) {
  if (curState !== newState){
    changeVlidator(newState);
  }
}


function playRunwayAnime(){
  scrollUpAnim.play();
  scrollDownAnim.play();
}

function runwayExit(state){
  // scrollDownAnim.pause();
  // scrollUpAnim.pause();
  runwayFade.play();

  if (state == "hide") {
    removeRunway.restart();
  }
}

function defineAutoup(){
  var runtime = 80000;
  var maxscroll = document.getElementById('autoup').offsetHeight;
  var imgHeight = document.getElementById('identifier1').offsetHeight;
  var offset = maxscroll - imgHeight*1.5;
  // console.log(imgHeight);

  scrollUpAnim = anime({
    targets: '#autoup',
    translateY: [0, -offset],
    direction: 'alternate',
    easing: 'linear',
    loop: true,
    duration: runtime,
    autoplay: false
  });
}

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
    duration: runtime,
    autoplay: false
  });
}

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

function zoom(id){
  var shrinked = false;

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

function defineZoom(id, i){
  var target = "#" + id;

  if (i%2 == 0){
    var dir = 1;
  } else {var dir = -1};

  document.getElementById('overlay').style.display = 'initial';
  document.getElementById(id).style.zIndex = 1;


  var big = anime({
      targets: target,
      translateX: 200*dir,
      scale: 1.5,
      easing: 'easeInOutExpo',
      duration: 1000
    });

  var darken = anime({
      targets: "#overlay",
      opacity: 0.8,
      easing: 'easeInOutExpo',
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
      easing: 'easeInOutExpo',
      duration: 1000
    });

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