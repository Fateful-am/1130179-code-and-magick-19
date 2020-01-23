'use strict';

// Параметры окна статистики: отступ слева
var CLOUD_MARGIN_LEFT = 100;
// Параметры окна статистики: отступ сверху
var CLOUD_MARGIN_TOP = 10;
// Параметры окна статистики: высота
var CLOUD_HEIGHT = 270;
// Параметры окна статистики: ширина
var CLOUD_WIDTH = 420;
// Параметры окна статистики: цвет заливки
var CLOUD_COLOR = '#FFF';
// Параметры окна статистики: параметры шрифта
var CLOUD_FONT = '16px PT Mono';
// Параметры окна статистики: отступ заголовка сверху
var CLOUD_CAPTION_MARGIN_TOP = 20;
// Параметры окна статистики: отступ заголовка слева
var CLOUD_CAPTION_MARGIN_LEFT = 20;
// Параметры окна статистики: высота строки заголовка
var CLOUD_CAPTION_LINE_HEIGHT = 24;
// Параметры окна статистики: цвет шрифта заголовка
var CLOUD_CAPTION_FONT_COLOR = '#000';

// Смещение тени
var SHADOW_OFFSET = 10;
// Цвет тени
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

// Высота гистограмы
var BAR_HEIGHT = 150;
// Ширина колонки
var BAR_WIDTH = 40;
// Расстояние между колонками
var BAR_GAP = 50;
// Цвет колонки для текущего игрока
var BAR_OWN_COLOR = 'rgba(255, 0, 0, 1)';
// Цвет колонок для других игроков, 240=синий
var BAR_OTHER_COLOR_HUE = 240;
// Цвет подписи колонок
var BAR_FONT_COLOR = '#000';
// Отступ от нижней границы облака
var BAR_MARGIN_BOTTOM = 30;
// Отступ текста от столбца
var BAR_TEXT_PADDING = 3;

/**
 * Отрисовка прямоугольника
 * @param {CanvasRenderingContext2D} ctx    канвас на котором рисуется игра
 * @param {number} x                        крайняя левая точка прямоугольника
 * @param {number} y                        крайняя верхняя точка прямоугольника
 * @param {number} width                    ширина прямоугольника
 * @param {number} height                   высота прямоугольника
 * @param {string} color                    цвет заливки
 */
function renderRectangle(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

/**
 * Отрисовка надписи
 * @param {CanvasRenderingContext2D} ctx    канвас на котором рисуется игра
 * @param {string} font                     параметры шрифта надписи
 * @param {CanvasTextBaseline} textBaseline база шрифта надписи
 * @param {string} color                    цвет заливки шрифта надписи
 * @param {string} text                     текст надписи
 * @param {number} x                        крайняя левая точка надписи
 * @param {number} y                        крайняя верхняя точка надписи
 */
function renderText(ctx, font, textBaseline, color, text, x, y) {
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

/**
 * Отрисовка облака со статистикой
 * @param {CanvasRenderingContext2D} ctx    канвас на котором рисуется игра
 */
function renderStatisticCloud(ctx) {
  // отрисовка тени облака
  renderRectangle(ctx, CLOUD_MARGIN_LEFT + SHADOW_OFFSET, CLOUD_MARGIN_TOP + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  // отрисовка облака
  renderRectangle(ctx, CLOUD_MARGIN_LEFT, CLOUD_MARGIN_TOP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
}

/**
 * Отрисовка статистики игрока после прохождения уровня
 * @param {CanvasRenderingContext2D} ctx   канвас на котором рисуется игра
 * @param {string[]} names                 массив с именами игроков прошедших уровень
 * @param {number[]} times                 массив содержит время прохождения уровня соответствующего игрока из массива names
 */
window.renderStatistics = function (ctx, names, times) {
  // список строк в заголовке облака статистики
  var cloudCaptionStrings = ['Ура вы победили!', 'Список результатов:'];
  // Нижняя координата по y для гистограммы
  var barBottom = CLOUD_MARGIN_TOP + CLOUD_HEIGHT - BAR_MARGIN_BOTTOM;
  // Координата для столбца гистограммы, изначально центруем гистограмму по центру
  var barLeft = CLOUD_MARGIN_LEFT + Math.floor((CLOUD_WIDTH - BAR_WIDTH * names.length - BAR_GAP * (names.length - 1)) / 2);
  // Значение максильного времени прохождения игроком уровня
  var maxTime = Math.max.apply(null, times);

  renderStatisticCloud(ctx);
  // Отрисовка заголовка статистики
  for (var i = 0; i < cloudCaptionStrings.length; i++) {
    renderText(ctx, CLOUD_FONT, 'top', CLOUD_CAPTION_FONT_COLOR, cloudCaptionStrings[i], CLOUD_MARGIN_LEFT + CLOUD_CAPTION_MARGIN_LEFT,
        CLOUD_MARGIN_TOP + CLOUD_CAPTION_MARGIN_TOP + i * CLOUD_CAPTION_LINE_HEIGHT);
  }

  // Цвет столбца в статистике
  var barColor;
  // Высота столбца для игрока
  var barHeight;
  // Отрисовка столбцов и надписей гистограммы
  for (var j = 0; j < names.length; j++) {
    barHeight = (times[j] / maxTime * BAR_HEIGHT);
    // Определение цвета столбца
    barColor = names[j] === 'Вы' ? BAR_OWN_COLOR : 'hsl(' + BAR_OTHER_COLOR_HUE + ', ' + Math.random() * 100 + '%, 50%)';
    // Отрисовка бара
    renderRectangle(ctx, barLeft, barBottom - barHeight, BAR_WIDTH, barHeight, barColor);
    // Отрисовка имени игрока
    renderText(ctx, CLOUD_FONT, 'top', BAR_FONT_COLOR, names[j], barLeft, barBottom + BAR_TEXT_PADDING);
    // Отрисовка времени прохождения уровня
    renderText(ctx, CLOUD_FONT, 'bottom', BAR_FONT_COLOR, Math.floor(times[j]).toString(), barLeft, barBottom - barHeight - BAR_TEXT_PADDING);

    barLeft += (BAR_WIDTH + BAR_GAP);
  }
};
