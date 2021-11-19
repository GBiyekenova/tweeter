$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let counter = 140 - this.value.length;
    $("#counter").text(counter);
    if (counter < 0) {
      $("#counter").addClass("form-red");
    } else {
      $("#counter").removeClass("form-red");
    }
  })
});