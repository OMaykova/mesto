export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
// создание template галереи карточек
  renderItems() {
    this._initialArray.forEach((el) => {
      this._renderer(el);
    });
  }
// добавление в HTML в конец галереи
  addItem(element) {
    this._container.append(element);
  }
// добавление в HTML в начало галереи
  addUserItem(element) {
    this._container.prepend(element);
  }
}
