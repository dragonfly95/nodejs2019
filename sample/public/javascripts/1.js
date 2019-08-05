
$(document).ready(function () {
  console.log('1.js');

  $('li').on('click', function() {
    var _userid = $(this).data('userid');
    console.log(_userid)
    
    $.ajax({
      url: "/users/" + _userid,
      dataType: "json",
      success: function (response) {
        $('[name="userid"]').val(response.userid);
        $('[name="userpw"]').val(response.userpw);
      },
      error: function(response) {
        alert('error#1');
      }
    });
  }) // li click 

  $('[name="btn-save"]').on('click', function() {
    $.ajax({
      type: "put",
      url: "/users/" + $('[name="userid"]').val(),
      data: JSON.stringify({
        userid: $('[name="userid"]').val(),
        userpw: $('[name="userpw"]').val()
      }),
      contentType: 'application/json',
      dataType: "json",
      success: function (response) {
        
      },
      error: function (response) {

      }
    });
  })
});