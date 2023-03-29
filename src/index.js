import './style.css';
import { addTask, deleteTask, editTask, saveTasks, tasks } from './script';
import leftImage from './assets/left.png';
import menuIcon from './assets/menu.png';
import trash from './assets/trash.png';

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
        console.log(`Editing task at index ${index} with new description: ${newDescription}`);
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

    // label.appendChild(checkbox);
    // label.appendChild(document.createTextNode(task.description));

    const img = document.createElement('img');
    img.src = menuIcon;
    img.alt = 'menu';
    img.classList.add('menu');

    img.addEventListener('click', () => {
      const dust = new Image();
      dust.src = trash;
      dust.classList.add('dust');

      const listItems = document.querySelectorAll('.list-container');
      listItems.forEach(item => {
        item.style.backgroundColor = '';
      })

      listItem.style.backgroundColor = '#fff9a6';
      listItem.style.margin = 0;

      dust.addEventListener('load', () => {
        imgContainer.removeChild(img);
        imgContainer.appendChild(dust);

        dust.addEventListener('click', () => {
          deleteTask(index);
          populateTodoList()
          saveTasks();
        });
      });
    });


    const imgContainer = document.createElement('div');
    imgContainer.classList.add('list-alignment');

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

document.addEventListener('DOMContentLoaded', () => {
  populateTodoList();
});

const arrow = document.querySelector('#left-arrow');
arrow.classList.add('left-arrow');
arrow.src = leftImage;
