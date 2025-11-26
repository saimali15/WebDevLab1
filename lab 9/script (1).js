const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

// Add new todo
addBtn.addEventListener('click', () => {
  addTodo();
});

// Add on Enter key
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = { text, completed: false, id: Date.now() };
  todos.push(todo);
  saveTodos();
  renderTodos();
  todoInput.value = '';
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button onclick="toggleComplete(${todo.id})">✔️</button>
        <button onclick="editTodo(${todo.id})">✏️</button>
        <button onclick="deleteTodo(${todo.id})">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function toggleComplete(id) {
  todos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
  saveTodos();
  renderTodos();
}

function editTodo(id) {
  const newText = prompt('Edit your task:');
  if (newText === null) return;
  todos = todos.map(todo => todo.id === id ? {...todo, text: newText} : todo);
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
