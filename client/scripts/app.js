// YOUR CODE HERE:

var app = app || {};


app.init = function() {
  $(function() {
    $('#send').on("click", function(e) {
      e.preventDefault();
      app.send();
      $('#message').val('');
    });
    $('#clearMessage').on("click", function(e) {
      e.preventDefault();
      app.clearMessages();
    });

    $('#roomAdder').on("click", function(e) {
      e.preventDefault();
      app.addRoom();
    });

    $('.username').on("click", function () {
      app.addFriend();
    });
    app.fetch();
    app.send();


  });
};

app.handleSubmit = function () {

};

app.send = function() {
  var buildMessage = function() {
    var username = window.location.search.slice(10);
    var text = $('#message').val();
    var roomname = 'main';
    var message = {
      username: username,
      text: text,
      roomname: "lobby"
    };
    return message;
  };

  // var message = buildMessage();
  // var message = {
  //   username: 'Mel Brooks',
  //   text: 'It\'s good to be the king',
  //   roomname: 'lobby'
  // };
  var message = buildMessage();
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent');
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

  // setTimeout(app.send.bind(this), 1000);
};

app.clearMessages = function() {
  $('#chats').empty();
};

// app.addMessage = function(message) {
//   $('#chats').append('<div class="chat"><p class="username">' + message.username + '</p><p>' + message.text + '</p></div>');
// };

// app.addFriend = function () {
//   // body...
// }

app.addRoom = function(roomname) {
  $('#roomSelect').append('<option value="drunkWizards">Shazzaaam!</option>');
};

app.addMessage = function (results) {
  for (var i = 0; i < results.length; i++) {
        var date = results[i].createdAt;
        var $message = $('<p></p>').text(results[i].text).html();
        var username = results[i].username;
        var roomname = results[i].roomname;
        $('#chats').append('<div class="chat"><p class="username">' + message.username + '</p>' + $message); 
      }
};

app.fetch = function() {

  $.get('https://api.parse.com/1/classes/chatterbox', function(data) {
    var results = data.results;
    app.addMessage(results);
  });



};

app.init();