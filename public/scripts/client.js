/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  /* loadTweets function makes a GET call to backend to load tweets*/
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
      .then(function(response) {
        console.log('Success: ', renderTweets);
        $('#tweet-container').empty();
        renderTweets(response);
        $("#counter").val(140);
      });
  
  };
  loadTweets();

  /*Function posts data to backend, also checks if the tweet text is not empty or does not exceed 140 characters.*/
  $("#add-tweet").submit(function(event) {
    event.preventDefault();
    let str = $(this).serialize();
    if (document.getElementById('tweet-text').value == "") {
      return $(".empty-tweet").show().slideDown("slow");
    } else {
      $(".empty-tweet").hide();
    }
    if (document.getElementById('tweet-text').value.length > 140) {
      return $(".long-tweet").show();
    } else {
      $(".long-tweet").hide();
    }
    $.ajax({
      url: "/tweets",
      method: "post",
      data: str
    })
      .then(()=> loadTweets());
    return document.getElementById('tweet-text').value = "";

  });

  /* renderTweets function goes over tweets array(backend response) and passes every object to createTweetElement function.*/
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      let $returnedTweet = createTweetElement(tweet);
      $('#tweet-container').prepend($returnedTweet);
    });
  };

  /*CreateTweetElement function creates a new instance of a tweet and returns it.*/
  const createTweetElement = function(tweet) {
    const theTweet = `<article class="tweet">
          <header class="header"> <div class="left-side-header"><div class="image"> <img src=${tweet.user.avatars} alt="logo"></div> <div>${tweet.user.name}</div></div>  <div>${tweet.user.handle}</div> </header>
          <p class="tweet-text">
          ${escape(tweet.content.text)}
          </p>
          <footer> 
            <div> ${timeago.format(tweet.created_at)}</div> 
            <div class="flags-container">
              <div class="flags"><i class="fas fa-flag"></i></div> 
              <div class="flags"><i class="fas fa-retweet"></i></div> 
              <div class="flags"><i class="fas fa-heart"></i></div>
            </div> 
          </footer>
        </article>`;

    return theTweet;
  };

});