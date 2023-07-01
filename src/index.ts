function isObject(item: any) {
  return item && typeof item === 'object';
}

function handleArray(arr: any[]): string {
  return arr.reduce((prev: string, item: any) => {
    const p = prev ? `${prev} ` : prev;
    if (item == null) {
      return p.trim();
    }
    if (isObject(item)) {
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
    variables.forEach((v, i) => {
      if (['number', 'string', 'boolean'].includes(typeof v)) {
        str += `${structure[i]}${v}`;
      }
      if (v == null) {
        // handles both null and undefined
        str += structure[i];
      }
      if (isObject(v)) {
        if (Array.isArray(v)) {
          str += `${structure[i]}${handleArray(v)}`;
        } else {
          str += `${structure[i]}${JSON.stringify(v)}`;
        }
      }
    });
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
