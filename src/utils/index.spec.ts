import { classNames } from './index';

describe('classNames', () => {
  it('should convert list of strings to class string', () => {
    expect(classNames('hello', 'world')).toBe('hello world');
  });
  it('should convert object of classes with expressions to class string', () => {
    expect(classNames({ hello: true, world: true })).toBe('hello world');
    expect(classNames({ hello: true, world: false })).toBe('hello');
  });
  it('should convert mix of class object and string to class string', () => {
    expect(classNames({ hello: true, world: false }, 'world')).toBe(
      'hello world'
    );
  });
  it('should ignore arguments which are not string or number', () => {
    expect(
      classNames({ hello: true, world: false }, 'world', 104, null, true, false)
    ).toBe('hello world 104');
  });
  it('should NOT preserve spaces in classes if passed', () => {
    expect(
      classNames({ hello: true, world: false }, ' world ', { ' earth ': true })
    ).toBe('hello world earth');
  });
  it('should ignore classes which are just created using spaces', () => {
    expect(classNames({ hello: true, world: false }, '     ')).toBe('hello');
  });
  it('should accept array of classes and convert them into class string', () => {
    expect(classNames({ hello: true, world: false }, ['world', 'earth'])).toBe(
      'hello world earth'
    );
  });
  it('should accept class string with spaces', () => {
    expect(classNames('hello   world')).toBe('hello world');
  });
  it('should dedupe classes of same names', () => {
    expect(
      classNames(
        'hello   world',
        { hello: true, earth: true },
        { world: false, globe: true },
        'globe'
      )
    ).toBe('hello world earth globe');
  });
});
