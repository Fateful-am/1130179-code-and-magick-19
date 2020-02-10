'use strict';

(function () {

  // Иконка открытия диалога настроек
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  // Кнопка закрытия диалога настроек
  var setupClose = window.settings.setupDialogWrapper.querySelector('.setup-close');

  /**
   * Обработчик для открытия окна настроек по клику
   */
  function onClickOpenSetupDialog() {
    openSetupDialogActions();
  }

  /**
   * Обработчик клика для закрытия окна настроек
   */
  function onClickCloseSetupDialog() {
    closeSetupDialogActions();
  }

  /**
   * Обработчик для открытия окна настроек по Enter
   * @param {Event} evt
   */
  function onKeyDownOpenSetupDialog(evt) {
    window.utils.processEnterAction(evt, openSetupDialogActions);
  }


  function setDefaults() {
    // Установка tabIndex, чтобы иконка была доступна через клавиатуру
    setupOpenIcon.tabIndex = 0;
    // Добавляем обработчики на открытие окна настроек по клику и по Enter
    setupOpenIcon.addEventListener('click', onClickOpenSetupDialog);
    setupOpenIcon.addEventListener('keydown', onKeyDownOpenSetupDialog);
  }

  /**
   * Действия необходимые при открытии окна настроек
   */
  function openSetupDialogActions() {
    // Удаляем возможность фокусировки иконки пользователя
    setupOpenIcon.removeAttribute('tabindex');
    // Удаялем обработчики на открытие окна настроек
    setupOpenIcon.removeEventListener('click', onClickOpenSetupDialog);
    setupOpenIcon.removeEventListener('keydown', onKeyDownOpenSetupDialog);
    // Добавляем обработчик на закрытие окна настроек
    setupClose.addEventListener('click', onClickCloseSetupDialog);
    // Добавляем обработчик на нажатие клавиш при открытом окне настроек
    document.addEventListener('keydown', onKeyDownSetupDialog);

    window.setup.init();

    // Показ окна настроек персонажа
    window.utils.visibleToggle(window.settings.setupDialogWrapper, true);
  }

  /**
   * Действия необходимые при закрытии окна настроек
   */
  function closeSetupDialogActions() {
    // Скрытие окна настроек
    window.utils.visibleToggle(window.settings.setupDialogWrapper, false);

    setDefaults();
    // Удаляем обработчик на закрытие окна настроек
    setupClose.removeEventListener('click', onClickCloseSetupDialog);
    // Удаляем обработчик на нажатие клавиш при открытом окне настроек
    document.removeEventListener('keydown', onKeyDownSetupDialog);
    window.setup.finish();
  }

  /**
   * Обработчик нажатия клавиш при открытом окне настроек
   * @param {KeyboardEvent} evt
   */
  function onKeyDownSetupDialog(evt) {
    if (evt.target === window.settings.setupUserName) {
      // Если фокус на инпуте ввода имени персонажа - не закрывать окно настроек
      evt.stopPropagation();
    } else {
      window.utils.processEscAction(evt, closeSetupDialogActions);
    }
    if (evt.target === setupClose) {
      evt.stopPropagation();
      window.utils.processEnterAction(evt, closeSetupDialogActions);
    }
  }

  setDefaults();
})();
