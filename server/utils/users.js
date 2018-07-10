// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = []
  }

  addUser (id, name, room) {
    var user =  {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    //return removed user
    // for (let i = 0; i <= this.users.length; i++) {
    //   if (this.users[i].id == id) {
    //     return this.users.pop(i);
    //   }
    // }
    // return false;

    // const user = this.users.filter((user) => user.id !== id)[0];
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }



  getUser (id) {
    return this.users.filter((users) => users.id == id)[0]
  }

  getUserList (room) {
    //return array of people in room
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

}


module.exports = {Users};
