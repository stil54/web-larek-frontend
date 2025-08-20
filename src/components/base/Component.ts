// import { IEvents } from '../../types/events';


export abstract class Component<T> {
  protected constructor(
    protected readonly container: HTMLElement
  ) { }

  // Переключить класс
  toggleClass(element: HTMLElement, className: string, force?: boolean): void {
    element.classList.toggle(className, force);
  }

  // Установить текстовое содержимое
  protected setText(element: HTMLElement, value: string): void {
    if (element) {
      element.textContent = String(value);
    }
  }

  // Установить состояние disabled
  setDisabled(element: HTMLElement, state: boolean): void {
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  // Скрыть элемент
  protected setHidden(element: HTMLElement): void {
    element.style.display = 'none';
  }

  // Показать элемент
  protected setVisible(element: HTMLElement): void {
    element.style.removeProperty('display');
  }

  // Установить изображение с алтернативным текстом
  protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  // Вернуть корневой DOM-элемент
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}