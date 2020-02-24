'use strict';

(function () {
  // Поддерживаемые типы файлов аватарок
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Контейнер для аватара
  var dialogHandle = window.settings.setupDialogWrapper.querySelector('.upload');
  // Компонент выбирающий аватарку
  var fileChooser = document.querySelector('.upload input[type=file]');
  // Картинка для вставки аватара
  var preview = document.querySelector('.setup-user-pic');

  /**
   * Обработка нажатия кнопки мыши на аватар
   * @param {Event} evt
   */
  function onDialogHandleMouseDown(evt) {
    evt.preventDefault();
    // Запомним координаты точки, с которой мы начали перемещать диалог
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    /**
     * // Обработчик события передвижения мыши
     * @param {Event} moveEvt
     */
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // проверка чтобы диалог не поднимался выше окна
      var top = Math.max(window.settings.setupDialogWrapper.offsetTop - shift.y, 0);

      window.settings.setupDialogWrapper.style.top = top + 'px';
      window.settings.setupDialogWrapper.style.left = (window.settings.setupDialogWrapper.offsetLeft - shift.x) + 'px';
    }

    /**
     * // Обработчик события отпускания кнопки мыши
     * @param {Event} upEvt
     */
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        // Если не было движения, это условие будет истино
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    }

    // Добавим обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Добавляем обработчик нажатия кнопки мыши на аватар
  dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
  // Обработчик изменения состояния выбоа файла
  fileChooser.addEventListener('change', function () {
    // первый из списка файлов
    var file = fileChooser.files[0];
    // Имя файла
    var fileName = file.name.toLowerCase();
    // проверка по расширению файла
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  });

})();
