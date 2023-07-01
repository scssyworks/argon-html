export function html(
  structure: TemplateStringsArray,
  ...variables: any[]
): DocumentFragment {
  let htmlString = '';
  if (variables.length === 0) {
    htmlString = structure.join('');
  } else {
    variables.forEach((v, i) => {
      if (['number', 'string', 'boolean'].includes(typeof v)) {
        htmlString += `${structure[i]}${v}`;
      }
      if (v == null) {
        // handles both null and undefined
        htmlString += structure[i];
      }
      if (v && typeof v === 'object') {
        htmlString += `${structure[i]}${JSON.stringify(v)}`;
      }
    });
    htmlString += structure[structure.length - 1];
  }
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content;
}
