'use strict';

// Создаем класс
class Options {
  // Записываем данные переданные в аргументах при вызове класса в объект this
  constructor(text = `Пусто`, height = `100px`, width = `100%`, bg = `tomato`, fontSize = `18px`, textAlign = `center`) {
    this.text = text;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  // Метод который создает элемент на странице из данных лежащих в объекте this
  create() {
    let newNode = document.createElement(`div`);
    newNode.textContent = this.text;
    newNode.style.height = this.height;
    newNode.style.width = this.width;
    newNode.style.backgroundColor = this.bg;
    newNode.style.fontSize = this.fontSize;
    newNode.style.textAlign = this.textAlign;
    document.body.append(newNode);
    console.log(newNode);
  }
}

// Записываем в переменную вызов класса со всеми нужными аргументами
let square = new Options();
// Создем элемент на странице при помощи метода лежащего в классе
square.create();
