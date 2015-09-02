var app = app || {};

app.Chat = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  defaults: {
    text: 'Hello',
    username: 'Guest',
    roomname: 'Lobby'
  }
});

app.Chats = Backbone.Collection.extend({
  model: app.Chat,
  url: 'https://api.parse.com/1/classes/chatterbox',

  loadMsgs: function () {
    this.fetch();
  },

  parse: function (res, options) {
    var results = [];
    for (var i = res.results.length - 1; i >= 0; i--) {
      results.push(res.results[i]);
    }
    return results;
  }

});

app.FormView = Backbone.View.extend({

  el: 'thing',

  // initialize: function () {
  // //   this.collection.on('sync', this.stopSpinner, this);
  // // },

  events: {
    'click #send': 'handleSubmit'
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var $text = this.$('#message');
    this.collection.create({
      username: window.location.search.slice(10),
      text: $text.val()
    });
    $text.val('');
  },

});


app.ChatView = Backbone.View.extend({
  tagName: 'div',
  className: 'chatContainer',

  template: _.template($('#chatTemplate').html()),

  initialize: function(){
   this.model.on('change', this.render, this); 
  },

  render: function () {
    this.$el.html( this.template( this.model.attributes ) );
    return this.$el;
  }

});

app.ChatsView = Backbone.View.extend({
  el: '#chats',
  initialize: function () {
    this.collection.on('sync', this.render, this);  
  },

  render: function () {
    this.collection.forEach(this.renderChat, this);
  },

  renderChat: function (item) {
    var chatView = new app.ChatView({
      model: item
    });
    this.$el.prepend(chatView.render());
  }
});

// var chat = new Chat('Hello', 'Alex', 'Lobby');


$(function () {
  var messages = new app.Chats();
  var formView = new app.FormView({ collection: messages });
  var messagesView = new app.ChatsView({ collection: messages });
  setInterval(messages.loadMsgs.bind(messages), 1000);
  messages.loadMsgs();
});