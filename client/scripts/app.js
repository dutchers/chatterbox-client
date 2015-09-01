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
    app.refresh();



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
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.clearMessages = function() {
  $('#chats').empty();
};


app.addRoom = function(roomname) {
  $('#roomSelect').append('<option value="drunkWizards">Shazzaaam!</option>');
};

app.addMessage = function (results) {
  for (var i = 0; i < 20 ; i++) {
        var date = results[i].createdAt;
        var $message = $('<p></p>').text(results[i].text).html();
        var username = results[i].username || "Guest";
        var roomname = results[i].roomname;
        var timeStamp = results[i].createdAt;
        $('#chats').append('<div class="col-md-12 chat"><span class="username">' + username + '</span><span class="timeStamp">' + timeStamp + '</span><p class="msg">' + $message + '</p>');
      }
};

app.fetch = function() {

  $.get('https://api.parse.com/1/classes/chatterbox', function(data) {
    var results = data.results;
    app.addMessage(results);
  });

  // setTimeout(app.fetch.bind(this), 5000);

};

app.refresh = function () {
  $('#chats').fadeOut(100)empty();
  app.fetch();
  setTimeout(app.refresh.bind(this), 10000);
}

app.init();