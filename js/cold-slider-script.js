$('.next').click(function(){
   $(this).parent().hide().next().show();//hide parent and show next
   $(".child1").delay(800).fadeIn();
   $(".child2").delay(1600).fadeIn();
   $(".child3").delay(2400).fadeIn();
   $(".child4").delay(3200).fadeIn();
   $(".child5").delay(4000).fadeIn();

});


$('.next2').click(function(){
   $(this).parent().hide().next().show();//hide parent and show next
   $(".child1").hide();
   $(".child2").hide();
   $(".child3").hide();
   $(".child4").hide();
   $(".child5").hide();

});


$('.reload').click(function(){
  location.reload();
});
