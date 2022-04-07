export class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._userName = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  };
  // создание объекта с данными пользователя из HTML
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      description: this._description.textContent
    }
  }
  // функция добавления данных пользователя из формы в HTML
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._description.textContent = data.about
  }
}
