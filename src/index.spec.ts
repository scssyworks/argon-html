import { html } from './index';

describe('html tag', () => {
  it('should render HTML correctly', () => {
    const fragment = html`<div class="test-class">hello world</div>`;
    expect(fragment).toMatchSnapshot();
  });

  it('should render HTML correctly with variables', () => {
    const v1 = 'Hello World';
    const v2 = 20;
    const v3 = true;
    const v4 = { t: 'test object' };
    const v5 = ['test array', 1, true, null, undefined, { q: 'test object 2' }];
    const v6 = null;
    const v7 = undefined;
    const v8 = document.createDocumentFragment();
    v8.appendChild(document.createElement('div'));
    const v9 = document.createElement('div');
    const v10 = document.createTextNode('Hello World');
    const v11 = document.createComment('This is comment');
    const fragment = html`
        <div class="test-class" id="testId">
          <div class="test-string">${v1}</div>
          <div class="test-number">${v2}</div>
          <div class="test-bool">${v3}</div>
          <div class="test-object">${v4}</div>
          <div class="test-array">${v5}</div>
          <div class="test-null">${v6}</div>
          <div class="test-undefined">${v7}</div>
          <div class="test-fragment">${v8}</div>
          <div class="test-html">${v9}</div>
          <div class="test-text-node">${v10}</div>
          ${v11}
        </div>
    `;
    expect(fragment).toMatchSnapshot();
  });
  it('should handle regular string', () => {
    const v = 'Hello';
    const fragment = html`${v}! This is regular string with variables.`;
    expect(fragment).toMatchSnapshot();
  });
});
