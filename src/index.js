import './style.css';
import leftImage from './assets/left.png';
import menuIcon from './assets/menu.png';
import trash from './assets/trash.png';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(description) {
  tasks.push({ description, completed: false, index: tasks.length });
}

function deleteTask(index) {
  tasks.splice(index, 1);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks();
}

function populateTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-container');

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('edit');

    const label = document.createElement('label');
    const span = document.createElement('span');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    if (checkbox.checked) {
      taskDescription.style.textDecoration = 'line-through';
    } else {
      taskDescription.style.textDecoration = 'none';
    }
    saveTasks();
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      populateTodoList();
    });
    span.appendChild(checkbox);

    taskDescription.textContent = task.description;
    taskDescription.setAttribute('contentEditable', 'true');

    taskDescription.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const newDescription = taskDescription.textContent.trim();
        editTask(index, newDescription);
        populateTodoList();
      }
    });

    taskDescription.addEventListener('input', () => {
      saveTasks();
    });

    label.addEventListener('click', (event) => {
      if (event.target === taskDescription) {
        event.preventDefault();
      }
    });

    const img = document.createElement('img');
    img.src = menuIcon;
    img.alt = 'menu';
    img.classList.add('menu');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('list-alignment');

    img.addEventListener('click', () => {
      const dust = new Image();
      dust.src = trash;
      dust.classList.add('dust');

      const listItems = document.querySelectorAll('.list-container');
      listItems.forEach((item) => {
        item.style.backgroundColor = '';
      });

      listItem.style.backgroundColor = '#fff9a6';
      listItem.style.margin = 0;

      dust.addEventListener('load', () => {
        imgContainer.removeChild(img);
        imgContainer.appendChild(dust);

        dust.addEventListener('click', () => {
          deleteTask(index);
          populateTodoList();
          saveTasks();
        });
      });
    });

    span.appendChild(taskDescription);
    label.appendChild(span);
    imgContainer.appendChild(label);
    imgContainer.appendChild(img);

    const hr = document.createElement('hr');
    hr.classList.add('list-line');
    listItem.appendChild(imgContainer);
    listItem.appendChild(hr);

    todoList.appendChild(listItem);
  });
}

const input = document.getElementById('add-list');
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const description = input.value.trim();
    if (description !== '') {
      addTask(description);
      input.value = '';
      saveTasks();
      populateTodoList();
    }
  }
});



const arrow = document.querySelector('#left-arrow');
arrow.classList.add('left-arrow');
arrow.src = leftImage;

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  populateTodoList();
});

document.addEventListener('DOMContentLoaded', () => {
  populateTodoList();
});



