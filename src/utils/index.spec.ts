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
  it('should ignore arguments which are not string', () => {
    expect(
      classNames({ hello: true, world: false }, 'world', null, true, false)
    ).toBe('hello world');
  });
  it('should preserve spaces in classes is passed', () => {
    expect(
      classNames({ hello: true, world: false }, ' world ', { ' earth ': true })
    ).toBe('hello  world   earth ');
  });
  it('should ignore classes which are just created using spaces', () => {
    expect(classNames({ hello: true, world: false }, '     ')).toBe('hello');
  });
  it('should accept array of classes and convert them into class string', () => {
    expect(classNames({ hello: true, world: false }, ['world', 'earth'])).toBe(
      'hello world earth'
    );
  });
});
