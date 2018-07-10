const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
      users = new Users();
      users.users = [{
        id: '1',
        name: 'mike',
        room: 'Node Course'
      }, {
        id: '2',
        name: 'pete',
        room: 'React Course'
      }, {
        id: '3',
        name: 'john',
        room: 'Node Course'
      }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'ang',
      room: 'avatar'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '3';
    const removedUser = users.removeUser(userId);

    expect(removedUser).toInclude({id:'3',name:'john',room:'Node Course'});
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    const userId = '123';
    const removedUser = users.removeUser(userId);

    expect(users.users.length).toBe(3);
    expect(removedUser).toNotExist();
  });

  it('should find user', () => {
    const userId = '3';
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    const userId = '123';
    const user = users.getUser(userId);

    expect(user).toNotExist();
  });


  it('should return names for Node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['mike','john']);
  });

  it('should return names for React course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['pete']);
  });

});
