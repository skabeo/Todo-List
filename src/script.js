const tasks = JSON.parse(localStorage.getItem('tasks'));

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

export {
  addTask, deleteTask, editTask, saveTasks, tasks,
};
