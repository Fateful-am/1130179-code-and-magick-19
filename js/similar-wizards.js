'use strict';

(function () {
  // Текущий внешний вид мага
  var wizardAppearance;

  // Интерфейс модуля
  window.similarWizards = {
    getSimilarWizards: getSimilarWizards
  };

  /**
   * Функция вычисления рейтинга похожести магов
   * @param {Object} wizard Объект мага
   * @return {number} возвращает рейтинг похожести мага
   */
  function getRank(wizard) {
    // значение рейтинга похожести мага по умолчанию
    var rank = 0;
    // совпадение по цвету мантии - наивысший приоритет
    if (wizard.colorCoat === wizardAppearance.coatColor) {
      rank += 2;
    }
    // совпадение по цвету глаз - меньший приоритет
    if (wizard.colorEyes === wizardAppearance.eyesColor) {
      rank += 1;
    }

    return rank;
  }

  /**
   * Функция компоратор по имени мага
   * @param {String} left первое из сравниваемых имен магов
   * @param {String} right второе из сравниваемых имен магов
   * @return {number} возвращает сортровку по имени
   */
  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   * Функция компоратор по рейтингу похожести магов
   * @param {Object} left первый из сравниваемых магов
   * @param {Object} right второй из сравниваемых магов
   * @return {number} возвращает сортровку по ретингу схожести
   */
  function rankComparator(left, right) {
    var rankDiff = getRank(right) - getRank(left);
    // если рейтинги одинаковы сортируем по имени
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }

    return rankDiff;
  }

  /**
   * Возвращает массив похожих магов
   * @param {Array} wizards массив всех магов
   * @param {Object} currentWizardAppearance Текущий внешний вид мага
   * @return {Array} массив похожих магов
   */
  function getSimilarWizards(wizards, currentWizardAppearance) {
    wizardAppearance = currentWizardAppearance;
    // Сортируем по рейтингу
    wizards.sort(rankComparator);

    // Возвращаем массив похожих магов
    return wizards.slice(0, window.settings.RANDOM_WIZARDS_COUNT);
  }

})();
