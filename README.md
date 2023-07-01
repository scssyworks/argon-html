# Argon HTML

HTML template tag to convert template string to DOM nodes

# Install

```sh
npm i argon-html
```

# Usage

### Covert template string to compatible HTML string

Simple example:

```ts
import { htmlString } from "argon-html";

const text = "Hello World!";

const htmlStr = htmlString`
  <div class="container">
    <div class="text">${text}</div>
  </div>
`;

console.log(htmlStr);

/**
 * Output:
 *
 * <div class="container">
 *  <div class="text">Hello World</div>
 * </div>
 */
```

Complex example:

```ts
import { htmlString } from "argon-html";

const text = [
  '<div class="text">Hello</div>',
  '<div class="text">World</div>',
  { key: "value" },
];

const htmlStr = htmlString`
  <div class="container">
    ${text}
  </div>
`;

console.log(htmlStr);

/**
 * Output:
 *
 * <div class="container">
 *  <div class="text">Hello</div>
 *  <div class="text">World</div>
 *  {"key": "value"}
 * </div>
 */
```

### Convert template string to DocumentFragement

```ts
import { html } from "argon-html";

const text = [
  '<div class="text">Hello</div>',
  '<div class="text">World</div>',
  { key: "value" },
];

const fragment = html`
  <div class="container">
    ${text}
  </div>
`;

console.log(fragment);

document.body.appendChild(fragment);

/**
 * Output:
 *
 * <DocumentFragment>
 *  <div class="container">
 *    <div class="text">Hello</div>
 *    <div class="text">World</div>
 *    {"key": "value"}
 *  </div>
 * </DocumentFragment>
 */
```
