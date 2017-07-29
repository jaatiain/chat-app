module.exports = function (socket) {

  console.log('connected: ' + socket.id);

  socket.on('disconnect', function() {
      console.log('disconnected: ' + socket.id);
      users.release(socket.id);
      socket.broadcast.emit('init users', { users: users.getUsers() });
  });

  socket.on('register user', function(data, fn) {
    if (users.register(data.name, socket.id)) {
      socket.broadcast.emit('init users', { users: users.getUsers() });
      fn(true);
    } else {
      fn(false);
    }
  });

  socket.on('release user', function() {
    users.release(socket.id);
    socket.broadcast.emit('init users', { users: users.getUsers() });
  });

  socket.on('get users', function() {
    socket.emit('init users', { users: users.getUsers() });
  });

  socket.on('chat message', function(data) {
    if (users.isRegistered(socket.id)) {
      console.log('message[' + users.getUser(socket.id) + ']: ' + data );
      socket.broadcast.emit('chat message', { message: data, user: users.getUser(socket.id) });
    }
  });

};

var users = (function () {
  var names = {};
  var userMap = {};

  return {
    register: function (name, id) {
      if (!name || names[name]) {
        return false;
      } else {
        names[name] = true;
        userMap[id.toString()] = name;
        console.log('register user: ' + name);
        return true;
      }
    },

    release: function(id) {
      if (id.toString() in userMap) {
        var key = id.toString();
        var name = userMap[key];
        delete userMap[key];
        delete names[name];
        console.log('release user: ' + name);
      }
    },

    isRegistered: function(id) {
      if (id.toString() in userMap) {
        return true;
      } else {
        return false;
      }
    },

    getUser: function(id) {
      return userMap[id.toString()];
    },

    getUsers: function() {
      var res = [];
      for (user in names) {
        res.push(user);
      }
      return res;
    }
  };
})();
