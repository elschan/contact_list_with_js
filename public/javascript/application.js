$(document).ready(function() {
  var hideAll = function() {
    $('#add_user').css('display', 'none');
    $('#list_of').empty();
    $('#list_of').css('display', 'none');
    $('#edit_user').css('display', 'none');
    $('#found').empty();
    $('#find_user').css('display', 'none');
  }

  $('#preAdd').on('click', function(){
    hideAll();
    $('#add_user').show();
  });

  $('#preFind').on('click', function(){
    hideAll();
    $('#find_user').show();
  });

  $('#list').on('click', function(){
    hideAll();
    var listOf = $('#list_of');
    if (listOf.css('display') == 'none'){
      $('#loading').show(); 
      listOf.show();
    $.ajax({
      url: 'list_users',
      dataType: 'json',
      method: 'get',
      success: function(users) {
        $.each(users, function(index,user) {
          var p = $("<p>")
          .text(user.name + " - " + user.email + "  ")
          .append("<button id='"+user.id +"' class='deleteButton'>Delete</button>")
          .append(" " + "<button id='"+user.id +"' class='editButton'>Edit</button>")
          .appendTo("#list_of");
        });        
        $('.deleteButton').on('click', function(){
          var delete_user_id = this.id
          $(this).parent().remove();
          $.ajax({
            url: 'delete_user',
            data: {delete_id: delete_user_id},
            dataType: 'json',
            method: 'DELETE',
            success: function(e){
              console.log(e);
            }
          })
        });
        $('.editButton').on('click', function(){
            $("#edit_user").show();
            var edited_user_id = this.id;
          $("#submitEditUser").on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            var editedName = $('#editName').val();
            var editedEmail = $('#editEmail').val();
            $.ajax({
              url: '/edit_user',
              dataType: 'json',
              method: 'POST',
              data: {newName: editedName, newEmail: editedEmail, editedUser: edited_user_id},
              success: function(e){
                console.log(e);
                $("#edit_user").fadeOut(1000);
              }
            })
          });
        });
        $('#loading').css('display', 'none');
      }
   });

    } else {
    listOf.empty();
    listOf.css('display', 'none');    
    };
    
  });

  $('#submitFindUser').on('click', function(){
    var find_user_name = $('#findName').val();
    var find_user_email = $('#findEmail').val();
    console.log(find_user_name);
    $.ajax({
      url: 'find_user',
      data: {query_name: find_user_name, query_email: find_user_email},
      dataType: 'json',
      method: 'get',
      success: function(u) {
        console.log('check');
        $.each(u, function(index,user) {
          var p = $("<p>").text(user.name + " - " + user.email + "  ").appendTo('#found');
          console.log(user);
          // debugger;
          // .append("<button id='"+user.id +"' class='deleteButton'>Delete</button>").appendTo("#found");
        });
        // $('.deleteButton').on('click', function(){
        //   var delete_user_id = this.id
        //   $(this).parent().remove();
        //   $.ajax({
        //     url: 'delete_user',
        //     data: {delete_id: delete_user_id},
        //     dataType: 'json',
        //     method: 'DELETE',
        //     success: function(e){
        //       console.log(e);
        //     }
        //   });
        // });
      }
    })
  });

  // $("#add").on('click', function(){
  //   .show("add_contact");

  // });

  var submitButton = document.querySelector('#submitNewUser');
  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var new_user_name = $('#addName').val();
    var new_user_email = $('#addEmail').val();
    console.log(e);
      $.ajax(
      {
        url: "/add_user",
        method: "POST",
        data: {name: new_user_name, email: new_user_email},
        dataType: 'json',
        success: function(result){
            console.log(result);
        },
        error: function(result){
            console.log(result);
        }
      }
    );  
  });
});
