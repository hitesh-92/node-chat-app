const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    const value = 123;
    const res = isRealString(value);

    expect(res).toBe(false);

  });

  it('should reject string with only white spaces', () => {
    const value = '   ';
    const res = isRealString(value);

    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const value = '  htesh  ';
    const res = isRealString('  hitesh  ');

    // console.log(res);


    expect(res).toBe(true);
  });

});
