'use strict';

(function () {
  // Минимальная длина имени пользователя
  var MIN_USER_NAME_LENGTH = 2;
  // Максимальная длина имени пользователя
  var MAX_USER_NAME_LENGTH = 25;
  // url отправки формы
  var FORM_ACTION = 'https://js.dump.academy/code-and-magick';
  // Количество рандомных магов
  var RANDOM_WIZARDS_COUNT = 4;
  // URL для загрузки данных с сервера
  var DATA_URL = 'https://js.dump.academy/code-and-magick/data';
  // URL для отправки данных формы
  var FORM_SEND_URL = 'https://js.dump.academy/code-and-magick';
  // Таймаут выполнения запроса
  var XHR_TIMEOUT = 10000;
  // Таймаут для устранения дребезга
  var DEBOUNCE_INTERVAL = 500;
  // Имена персонажей
  var firstNames = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  // Фамилии персонажей
  var secondNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  // Цвета мантий персонажей
  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  // Цвет глаз персонажей
  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];

  // Цвет файрбола
  var fireballColor = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // Контейнер с формой настроек персонажа
  var setupDialogWrapper = document.querySelector('.setup');
  // Поле ввода имени мага
  var setupUserName = setupDialogWrapper.querySelector('.setup-user-name');
  // форма для ввода характеристик персонажа
  var setupWizardForm = setupDialogWrapper.querySelector('.setup-wizard-form');

  // Интерфейс модуля
  window.settings = {
    MIN_USER_NAME_LENGTH: MIN_USER_NAME_LENGTH, // Минимальная длина имени пользователя
    MAX_USER_NAME_LENGTH: MAX_USER_NAME_LENGTH, // Максимальная длина имени пользователя
    RANDOM_WIZARDS_COUNT: RANDOM_WIZARDS_COUNT, // Количество рандомных магов
    XHR_TIMEOUT: XHR_TIMEOUT, // Таймаут выполнения запроса
    DATA_URL: DATA_URL, // URL для загрузки данныз с сервера
    FORM_SEND_URL: FORM_SEND_URL, // URL для отправки данных формы
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL, // Таймаут для устранения дребезга
    firstNames: firstNames, // Имена персонажей
    secondNames: secondNames, // Фамилии персонажей
    coatColors: coatColors, // Цвета мантий персонажей
    eyesColors: eyesColors, // Цвет глаз персонажей
    fireballColor: fireballColor, // Цвет файрбола
    setupDialogWrapper: setupDialogWrapper, // Контейнер с формой настроек персонажа
    setupUserName: setupUserName, // Поле ввода имени мага
    setupWizardForm: setupWizardForm // форма для ввода характеристик персонажа
  };

  // Установка ограничения на минимальную и максимальную длину имени персонажа
  setupUserName.minLength = MIN_USER_NAME_LENGTH;
  setupUserName.maxLength = MAX_USER_NAME_LENGTH;
  // Определяем url отправки формы
  setupWizardForm.action = FORM_ACTION;

})();
