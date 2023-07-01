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
      if (v && typeof v === 'object') {
        str += `${structure[i]}${JSON.stringify(v)}`;
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
