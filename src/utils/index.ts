export class ClassNames {
  #classList: string[] = [];
  constructor(...args: any[]) {
    args.forEach((arg) => {
      if (arg) {
        if (typeof arg === 'string' && arg.trim()) {
          this.#classList.push(arg);
        } else if (Array.isArray(arg)) {
          this.#classList.push(new ClassNames(...arg).transform());
        } else if (typeof arg === 'object') {
          Object.entries(arg).forEach(([className, expr]) => {
            if (expr) {
              this.#classList.push(className);
            }
          });
        }
      }
    });
  }
  transform() {
    return this.#classList.join(' ');
  }
}

export function classNames(...args: any[]) {
  return new ClassNames(...args).transform();
}
