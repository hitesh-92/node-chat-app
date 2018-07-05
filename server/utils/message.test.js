const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'testAdmin';
    const text = 'lorem ipsom testing...';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });


  });//generate correct message object
});

//geolocation
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'testAdmin';
    const latitude = 5;
    const longitude = 10;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(message.from).toBeA('string');
    expect(message).toInclude({from, url:`https://www.google.com/maps?q=5,10`});
    expect(message.createdAt).toBeA('number');

  });


});//generateLocationMessage
