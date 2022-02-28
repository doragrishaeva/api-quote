import quotesRu from './quotes.json' assert { type: "json" };
import i18Obj from './translate.js';

let quotes = [];
let currentQuote = {};
let currentBackground = {};
let backgrounds = [
  { color: 'rgba(99,107,108, 0.2)' },
  { color: 'rgba(82, 34, 34, 0.2)' },
  { color: 'rgba(70, 54, 87, 0.2)' },
  { color: 'rgba(175, 60, 33, 0.2)' },
  { color: 'rgba(41, 48, 66, 0.2)' },
  { color: 'rgba(247, 228, 168, 0.2)' },
  { color : 'rgba(220, 245, 2, 0.2)' },
  { color: 'rgba(242, 147, 12, 0.2)' },
  { color: 'rgba(171, 71, 99, 0.2)' },
  { color: 'rgba(255, 190, 184, 0.2)' },
  { color: 'rgba(7, 39, 116, 0.2)' },
  { color: 'rgba(73, 158, 154, 0.2)' }
];
let currentLanguage = '';

const button = document.querySelector('.button');
const quoteContainer = document.querySelector('.quote');
const appContainer = document.querySelector('.app');
const switchLanguageItems = document.querySelectorAll('.switch-language-item');

const getRandomKey = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// getRandomQuote
const getRandomQuote = () => {
  let source = currentLanguage === 'en' ? quotes : quotesRu;
  let key = getRandomKey(0, source.length);
  if (key === currentQuote.id) {
    getRandomQuote();
  } else {
    currentQuote = { id: key, ...source[key] };
  }
};

const getRandomBackground = () => {
  let key = getRandomKey(0, backgrounds.length);
  if (key === currentBackground.id) {
    getRandomBackground();
  } else {
    currentBackground = { id: key, ...backgrounds[key] };
  }
};

// setRandomQuote
const setRandomQuote = () => {
  quoteContainer.textContent = currentQuote.text;
};

// setRandomBackground
const setRandomBackground = () => {
  appContainer.style.backgroundColor = currentBackground.color;
};

// translate the page
const getTranslation = (targetElement, language) => {
  let elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => el.textContent = i18Obj[language][el.dataset.i18n]);
  targetElement.classList.add('switch-language-item-active');
  currentLanguage = language;
};

// on load event listener
window.addEventListener('load', async () => {
  // request all quotes
  const url = 'https://type.fit/api/quotes';
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  quotes = await res.json();

  currentLanguage = 'en';
  switchLanguageItems[0].classList.add('switch-language-item-active');

  // define the first currentQuote
  getRandomQuote();
  getRandomBackground();
  setRandomQuote();
  setRandomBackground();

});

// on click quote button
button.addEventListener('click', () => {
  getRandomQuote();
  getRandomBackground();
  setRandomQuote();
  setRandomBackground();
});

// on switch language
switchLanguageItems.forEach(el => {
  el.addEventListener('click', (event) => {
    switchLanguageItems.forEach(el => el.classList.remove('switch-language-item-active'));
    getTranslation(event.target, event.target.dataset.language);
    getRandomQuote();
    getRandomBackground();
    setRandomQuote();
    setRandomBackground();
  });
});

console.log(`
  Самостоятельная оценка: 70(60) баллов
  Вёрстка +10
  При загрузке страницы приложения отображается рандомная цитата +10
  При перезагрузке страницы цитата обновляется (заменяется на другую) +10
  Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
  Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д * +10
  Можно выбрать один из двух языков отображения цитат: en/ru или en/be ** +10
  Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`)
