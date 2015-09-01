var app = app || {};

app.Chat = Backbone.Model.extend({
  // initialize: function (message, username, roomname) {
  //   console.log("Model has been initialized.");
  //   this.set('message', message);
  //   this.set('username', username);
  //   this.set('roomname', roomname);
  //   // console.log(this.get('message') + ' from ' + this.get('username'));
  //   this.on('change', function (e) {
  //     console.log(e.changed);
  //   });
  // }
  defaults: {
    message: 'Hello',
    username: 'Guest',
    roomname: 'Lobby'
  }
});

app.Chats = Backbone.Collection.extend({
  model: app.Chat,
  url: 'https://api.parse.com/1/classes/chatterbox'
});


app.ChatView = Backbone.View.extend({
  tagName: 'div',
  className: 'chatContainer',

  template: _.template($('#chatTemplate').html()),


  render: function () {
    this.$el.html( this.template( this.model.attributes ) );
    // console.log("this should render");
    return this;
  }

});

app.ChatsView = Backbone.View.extend({
  el: 'body',

  initialize: function (chats) {
    this.collection = new app.Chats();
    this.collection.fetch({reset: true});
    console.log(this.collection);
    this.render();

    this.listenTo( this.collection, 'add', this.renderChat);
    this.listenTo( this.collection, 'reset', this.render );
  },
  render: function () {
    this.collection.each(function (item) {
      this.renderChat(item);
    }, this);
  },

  renderChat: function (item) {
    var chatView = new app.ChatView({
      model: item
    });
    this.$el.append(chatView.render().el);
  }
});

// var chat = new Chat('Hello', 'Alex', 'Lobby');


$(function () {
  var chats = [{
    message: 'Hello',
    username: 'Alex',
    roomname: 'Lobby'
  }, {
    message: 'Hola',
    username: 'Alex',
    roomname: 'Lobby'
  }, {
    message: 'Bonjour',
    username: 'Alex',
    roomname: 'Lobby'
  }, {
    message: 'Kon\'nichiwa',
    username: 'Alex',
    roomname: 'Lobby'
  } ];
  new app.ChatsView(chats);
});