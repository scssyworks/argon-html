export function trim(str: string) {
  return str.trim();
}
export class ClassNames {
  #classList: string[] = [];
  constructor(...args: any[]) {
    args.forEach((arg) => {
      if (arg) {
        if (['string', 'number'].includes(typeof arg)) {
          const trimmedClass = trim(`${arg}`);
          if (trimmedClass) {
            this.#add(trimmedClass);
          }
        } else if (Array.isArray(arg)) {
          this.#add(new ClassNames(...arg).transform());
        } else if (typeof arg === 'object') {
          Object.entries(arg).forEach(([className, expr]) => {
            if (expr) {
              this.#add(trim(className));
            }
          });
        }
      }
    });
  }
  transform() {
    return this.#classList.join(' ');
  }
  #add(arg: string) {
    arg.split(' ').forEach((cls) => {
      const trimmedClass = trim(cls);
      if (trimmedClass && !this.#classList.includes(trimmedClass)) {
        this.#classList.push(trimmedClass);
      }
    });
  }
}

export function classNames(...args: any[]) {
  return new ClassNames(...args).transform();
}
