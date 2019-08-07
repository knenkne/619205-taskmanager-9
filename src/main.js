'use strict';

// Utils
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Consts
const CARD_AMOUNT = 3;
const mainContainer = document.querySelector(`.main`);

const controls = [{
  name: `new-task`,
  description: `+ ADD NEW TASK`,
  isChecked: true,
},
{
  name: `tasks`,
  description: `TASKS`,
  isChecked: false
},
{
  name: `statistics`,
  description: `STATISTICS`,
  isChecked: false
}
];

const search = {
  name: `Search`,
  description: `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`
};

const filterNames = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`
];


const colorNames = [
  `black`,
  `blue`,
  `yellow`,
  `green`,
  `pink`
];

const hashtagNames = [`code`, `gym`, `work`];
const descriptions = [
  `It Looks Red, Tastes Blue`,
  `Mozart Season`,
  `Let There Be Love`,
  `Время лечит, слова калечат`,
  `Грокаем Алгоритмы`
];

const button = {
  name: `load-more`,
  description: `load more`
};

// Controls
const generateControlTemplate = ({
  name,
  description,
  isChecked
}) => {
  return `
    <input type="radio" name="control" id="control__${name}" class="control__input visually-hidden" ${isChecked ? `checked` : ``}/>
    <label for="control__${name}" class="control__label control__label--${name}">${description}</label>`.trim();
};

const generateConrolsTemplate = (items) => items
  .map(generateControlTemplate)
  .join(``);


// Search
const generateSearchTemplate = ({
  name,
  description
}) => {
  const searchTemplate =
    `<input type="text" id="${name.toLowerCase()}__input" class="${name.toLowerCase()}__input" placeholder="${description}" />
  <label class="visually-hidden" for="${name.toLowerCase()}__input">${name}</label>`.trim();

  return searchTemplate;
};


// Filters
const generateFilterData = (name) => {
  const filter = {
    name,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  };

  filter.isDisabled = filter.count === 0;

  return filter;
};

const generateFiltersData = (names) => {
  const filters = names.map(generateFilterData);

  const enabledFilters = filters.filter((filter) => !filter.isDisabled);
  getRandomElement(enabledFilters).isChecked = true;

  return filters;
};

const generateFilterTemplate = ({
  name,
  count,
  isChecked,
  isDisabled
}) => {
  const filterTemplate =
    `<input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}/>
    <label for="filter__${name.toLowerCase()}" class="filter__label">${name} <span class="filter__all-count">${count}</span></label>`.trim();
  return filterTemplate;
};

const generateFiltersTemplate = (names) => {
  const filters = generateFiltersData(names);
  const filtersTemplate = filters.map((filter) => generateFilterTemplate(filter));

  return filtersTemplate.join(``);
};


// Cards
const generateCardData = () => {
  const card = {
    color: getRandomElement(colorNames),
    hashtags: hashtagNames,
    description: getRandomElement(descriptions),
    date: `${getRandomNumber(1, 31)} August`,
    time: `${getRandomNumber(0, 12)}:${getRandomNumber(0, 60)}`
  };

  return card;
};

const generateCardsData = (amount) => {
  const cards = [...Array(amount)].map(generateCardData);

  return cards;
};

const generateHashtagTemplate = (hashtag) =>
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${hashtag}
    </span>
  </span>`.trim();

const generateHashtagsTemplate = (hashtags) => hashtags
  .map(generateHashtagTemplate).join(``);

const generateCardTemplate = ({
  color,
  hashtags,
  description,
  date,
  time
}) => {
  const cardTemplate = `<article class="card card--${color}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${date}</span>
                <span class="card__time">${time} PM</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${generateHashtagsTemplate(hashtags)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`.trim();

  return cardTemplate;
};

const generateCardsTemplate = (amount) => {
  const cards = generateCardsData(amount);
  const cardsTemplate = cards.map((card) => generateCardTemplate(card));

  return cardsTemplate.join(``);
};


// New card
const generateColorTemplate = (color) => {
  const colorTemplate =
    `<input type="radio" id="color-${color}-1" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === `black` ? `checked` : ``}/>
  <label for="color-${color}-1" class="card__color card__color--${color}">${color}</label>`;

  return colorTemplate;
};

const generateColorsTemplate = (colors) => colors
  .map(generateColorTemplate)
  .join(``);

const generateNewCardTemplate = () => {
  return `<article class="card card--edit card--black">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >This is example of new task, you can add picture, set date and time, add tags.</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>

            <fieldset class="card__date-deadline" disabled>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">no</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-1"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-1"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-1"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-1"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-1"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-1"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-1"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-1"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-1"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-1"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-1"
                />
                <label class="card__repeat-day" for="repeat-sa-1"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-1"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-1"
                  >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list"></div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
        </div>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            ${generateColorsTemplate(colorNames)}
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`.trim();
};


// Button
const generateButtonTemplate = ({
  name,
  description
}) => {
  const buttonTemplate = `<button class="${name}" type="button">${description}</button>`;

  return buttonTemplate;
};


// Containers & components
const renderContainer = (type, classes, parentContainer) => {
  const container = document.createElement(type);

  container.classList.add(...classes);

  parentContainer.append(container);

  return container;
};

const renderComponent = (template, container) => {
  container.insertAdjacentHTML(`beforeend`, template);
};


// Controls container
const controlsContainer = document.querySelector(`.main__control`);

// Search container
const searchContainer = renderContainer(`section`, [`main__search`, `search`, `container`], mainContainer);

// Filters container
const filtersContainer = renderContainer(`section`, [`main__filter`, `filter`, `container`], mainContainer);

// Board container
const boardContainer = renderContainer(`section`, [`board`, `container`], mainContainer);

// Tasks container
const tasksContainer = renderContainer(`div`, [`board__tasks`], boardContainer);

renderComponent(generateConrolsTemplate(controls), controlsContainer);
renderComponent(generateSearchTemplate(search), searchContainer);
renderComponent(generateFiltersTemplate(filterNames), filtersContainer);
renderComponent(generateNewCardTemplate(), tasksContainer);
renderComponent(generateCardsTemplate(CARD_AMOUNT), tasksContainer);
renderComponent(generateButtonTemplate(button), boardContainer);
