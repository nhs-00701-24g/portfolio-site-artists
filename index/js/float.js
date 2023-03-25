// index.htmlの右側要素のjs
$(function(){
  $(window).scroll(function (){
    $('.fadein').each(function(){
      var elementTop = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elementTop - windowHeight + 300){
        $(this).addClass('scrollin');
      }
    });
  });
});
