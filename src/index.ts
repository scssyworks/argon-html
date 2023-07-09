import { trim } from './utils';

function nodeToString(node: Node): string {
  switch (node.nodeType) {
    case 11:
      return Array.from(node.childNodes).reduce(
        (prev, next) => prev + nodeToString(next),
        ''
      );
    case 1:
      return (node as Element).outerHTML;
    case 3:
      return `${node.nodeValue}`;
    case 8:
      return `<!--${node.nodeValue}-->`;
    default:
      return '';
  }
}

function handleArray(arr: any[]): string {
  return arr.reduce((prev: string, item: any) => {
    const p = prev ? `${prev} ` : prev;
    if (item == null) {
      return trim(p);
    }
    if (typeof item === 'object') {
      return `${p}${JSON.stringify(item)}`;
    }
    return `${p}${item}`;
  }, '');
}

export function htmlString(
  structure: TemplateStringsArray,
  ...variables: any[]
) {
  let str = '';
  if (variables.length === 0) {
    str = structure.join('');
  } else {
    str = variables.reduce((prev: string, curr: any, index: number) => {
      const struct = `${prev}${structure[index]}`;
      if (curr == null) {
        return struct;
      } else if (Array.isArray(curr)) {
        return `${struct}${handleArray(curr)}`;
      } else if (typeof curr === 'object') {
        if (curr instanceof Node) {
          return `${struct}${nodeToString(curr)}`;
        }
        return `${struct}${JSON.stringify(curr)}`;
      }
      return `${struct}${curr}`;
    }, '');
    str += structure[structure.length - 1];
  }
  return str;
}

export function html(
  structure: TemplateStringsArray,
  ...variables: any[]
): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = htmlString(structure, ...variables);
  return template.content;
}

export * from './utils';
