function moveHome() {
  $("html, body").animate({ scrollTop: "0px" }, {easing : "linear", duration: 0});
}
function moveCovidTracker() {
  $("html, body").animate({ scrollTop: "780px" }, {easing : "linear", duration: 0});
}
function moveAbout() {
  $("html, body").animate({ scrollTop: "1570px" }, {easing : "linear", duration: 0});
}
function moveSymptoms() {
  $("html, body").animate({ scrollTop: "2445px" }, {easing : "linear", duration: 0});
}
function movePrevention() {
  $("html, body").animate({ scrollTop: "3500px" }, {easing : "linear", duration: 0});
}
function moveDoctors() {
  $("html, body").animate({ scrollTop: "5265px" }, {easing : "linear", duration: 0});
}
function moveBlog() {
  $("html, body").animate({ scrollTop: "6064px" }, {easing : "linear", duration: 0});
}
function moveContact() {
  $("html, body").animate({ scrollTop: "6995px" }, {easing : "linear", duration: 0});
}

$(window).on('load', function () {
  var owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 4,
      loop: true,
      // margin: 10,
      autoplay: true,
      autoplayTimeout: 2200,
      autoplayHoverPause: true
    });
  // var prevScrollpos = window.pageYOffset;
  $(window).scroll(() => {
    var currentScrollPos = window.pageYOffset;
    if ($(this).scrollTop() > 120) {
      $("header").css({"position":"fixed", "background-color": "rgba(255,255,255,0.85)"});

    } else {
      $("header").css({"position":"fixed", "background-color": "#ffffff"});
    }
    // if (prevScrollpos > currentScrollPos) {
    //   // document.getElementById("navbar").style.top = "0";
    //   $('header').css({"top": "0"})
    // } else {
    //   // document.getElementById("navbar").style.top = "-50px";
    //   $('header').css({"top":"-87px"})
    // }
    // prevScrollpos = currentScrollPos;
  })

  $(window).scroll(() => {
    let scroll = 0;
    scroll = $(this).scrollTop();
    if (scroll < 700) {
      $(".nav-option").removeClass('active')
      $("#nav-option-home").addClass('active')
    } else if (scroll >= 700 && scroll < 1450){
      $(".nav-option").removeClass('active')
      $("#nav-option-tracker").addClass('active')
    } else if (scroll >= 1450 && scroll < 2315){
      $(".nav-option").removeClass('active')
      $("#nav-option-about").addClass('active')
    } else if (scroll >= 2315 && scroll < 3271){
      $(".nav-option").removeClass('active')
      $("#nav-option-symptoms").addClass('active')
    } else if (scroll >= 3271 && scroll < 4915){
      $(".nav-option").removeClass('active')
      $("#nav-option-prevention").addClass('active')
    } else if (scroll >= 4915 && scroll < 5604){
      $(".nav-option").removeClass('active')
      $("#nav-option-doctors").addClass('active')
    } else if (scroll >= 5604 && scroll < 6105){
      $(".nav-option").removeClass('active')
      $("#nav-option-blog").addClass('active')
    } else if (scroll >= 6105){
      $(".nav-option").removeClass('active')
      $("#nav-option-contact").addClass('active')
    }
  })

})
