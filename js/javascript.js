
// Scripts for twitter and facebook button popups

    $(".icon-twitter").on("click", function(){

      var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
      window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

    });


    $(".icon-facebook").on("click", function(){


      var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";
    window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

    });



// Jquery to make the text in the table of contents boxes appearon hover only

    $(".hover-box").hover(function () {
        $(".hover-text").addClass("display");
    }, function () {
        $(".hover-text").removeClass("display");
    });
