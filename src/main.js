import {renderContainer} from './dom-utils';
import {renderComponent} from './dom-utils';

import {tasks} from './data';

import {controls} from './components/controls';
import {generateConrolsTemplate} from './components/controls';

import {search} from './components/search';
import {generateSearchTemplate} from './components/search';

import {filterNames} from './components/filters';
import {generateFiltersTemplate} from './components/filters';

import {Task} from './components/task';
import {TaskEdit} from './components/task-edit';

import {button} from './components/button';
import {generateButtonTemplate} from './components/button';

import {generateNoTasksTemplate} from './components/no-tasks';


const MAX_CARDS_ON_BOARD = 8;

const renderNoTasksMessage = (container) => {
  container.innerHTML = ``;
  renderComponent(generateNoTasksTemplate(), container);
};

const renderTask = (taskMock, container) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const taskElement = task.getElement();
  const taskEditElement = taskEdit.getElement();

  const onTaskElementEdit = () => container.replaceChild(taskEdit.getElement(), task.getElement());
  const onTaskElementSubmit = () => container.replaceChild(task.getElement(), taskEdit.getElement());
  const onTaskElementRemove = () => {
    const removedTaskIndex = tasks.findIndex((item) => item.id === task._id);
    tasks.splice(removedTaskIndex, 1);

    if (tasks.length === MAX_CARDS_ON_BOARD) {
      loadMoreButton.classList.add(`visually-hidden`);
    }

    if (tasks.length >= document.querySelector(`.board__tasks`).childNodes.length) {
      const nextTaskIndex = parseInt(document.querySelector(`.board__tasks`).lastChild.getAttribute(`data-index`), 10) + 1;
      renderTask(tasks.find((item) => item.id === nextTaskIndex), container);
    }

    if (tasks.length === 0 || tasks.every((item) => item.isArchive)) {
      renderNoTasksMessage(boardContainer);
    }

    taskEdit.removeElement();
    document.removeEventListener(`keydown`, onEscClick);
  };

  const onEscClick = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      onTaskElementSubmit();
    }

    document.removeEventListener(`keydown`, onEscClick);
  };

  // Task events
  taskElement.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    onTaskElementEdit();
    document.addEventListener(`keydown`, onEscClick);
  });

  // Task-edit events
  taskEditElement.addEventListener(`submit`, onTaskElementSubmit);
  taskEditElement.querySelector(`.card__delete`).addEventListener(`click`, onTaskElementRemove);

  taskEditElement.querySelector(`.card__text`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscClick);
  });

  taskEditElement.querySelector(`.card__text`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscClick);
  });


  task.renderElement(container);
};

// Main container
const mainContainer = document.querySelector(`.main`);

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

// Controls, search, filters
renderComponent(generateConrolsTemplate(controls), controlsContainer);
renderComponent(generateSearchTemplate(search), searchContainer);
renderComponent(generateFiltersTemplate(filterNames), filtersContainer);

// Tasks
for (const task of tasks.slice(0, MAX_CARDS_ON_BOARD)) {
  renderTask(task, tasksContainer);
}

// Load more button
renderComponent(generateButtonTemplate(button), boardContainer);
const loadMoreButton = document.querySelector(`.load-more`);

const onLoadMoreButtonClick = () => {
  for (const task of tasks.slice(MAX_CARDS_ON_BOARD)) {
    renderTask(task, tasksContainer);
  }

  loadMoreButton.classList.add(`visually-hidden`);
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);

// No tasks message
if (tasks.length === 0 || tasks.every((item) => item.isArchive)) {
  renderNoTasksMessage(boardContainer);
}

