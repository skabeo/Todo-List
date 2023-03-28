import './style.css';
import leftImage from './assets/left.png';
import menuIcon from './assets/menu.png';

const tasks = [
  { description: 'wash the dishes', completed: false, index: 0 },
  { description: 'complete To Do list project', completed: false, index: 1 },
];

function populateTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-container');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      populateTodoList();
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(task.description));

    const img = document.createElement('img');
    img.src = menuIcon;
    img.alt = 'menu';
    img.classList.add('menu');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('list-alignment');

    imgContainer.appendChild(label);
    imgContainer.appendChild(img);

    const hr = document.createElement('hr');
    hr.classList.add('list-line');
    listItem.appendChild(imgContainer);
    listItem.appendChild(hr);

    todoList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateTodoList();
});

const arrow = document.querySelector('#left-arrow');
arrow.classList.add('left-arrow');
arrow.src = leftImage;
