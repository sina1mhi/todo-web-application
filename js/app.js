// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filterField = document.querySelector('#filter');
const taskField = document.querySelector('#task');

// Load all event listeners
loadAllEventListeners();

// Load all event listeners function
function loadAllEventListeners() {
  // Load DOM event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filterField.addEventListener('keyup', filterTasks);
}

// Get Tasks From Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null || localStorage.getItem('tasks') === '[]') {
    taskList.innerHTML = '<h6 class="center-align">No Tasks</h6>';
    return;
  }
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));
  for (task of tasks) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    // create a element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append (li <== link) and (ul <== li)
    li.appendChild(link);
    taskList.appendChild(li);
  }
}

// Add Task function
function addTask(e) {
  if (taskField.value === '') {
    alert('Add a task!');
    return
  }
  // store task in local storage
  hasExists = storeTaskInLocalStorage(taskField.value);
  if (!hasExists) {
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskField.value));
    // create a element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append (li <== link) and (ul <== li)
    li.appendChild(link);
    headingElement = document.querySelector('h6.center-align');
    if (contains(taskList, headingElement))
      taskList.children[0].remove();
    taskList.appendChild(li);
  }
  // clear input
  taskField.value = '';
  e.preventDefault();
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null)
    tasks = [];
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks.includes(task)) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return false;
  }
  else {
    alert('Task already exists!');
    return true;
  }
}

// Remove Task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item'))
    if (confirm('Are you sure to delete the task?')) {
      const liElement = e.target.parentElement.parentElement;
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.splice(tasks.indexOf(liElement.textContent), 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      liElement.remove();
      if (taskList.innerHTML === '')
        taskList.innerHTML = '<h6 class="center-align">No Tasks</h6>';
    }
  e.preventDefault();
}

// Clear Tasks function
function clearTasks(e) {
  while (taskList.firstChild)
    taskList.removeChild(taskList.firstChild);
  localStorage.clear();
  taskList.innerHTML = '<h6 class="center-align">No Tasks</h6>';
  e.preventDefault();
}

// Filter Tasks
function filterTasks(e) {
  const items = document.querySelectorAll('.collection-item');
  for (task of items) {
    taskName = task.textContent.toLowerCase();
    if (!taskName.includes(filterField.value.toLowerCase()))
      task.style.display = 'none';
    else
      task.style.display = 'block';
  }
  e.preventDefault();
}