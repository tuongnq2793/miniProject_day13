const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const btnSubmit = form.querySelector('button');

let todos = [];
let editId = null;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  if (editId) {
    todos = todos.map(todo =>
      todo.id === editId ? { ...todo, text } : todo
    );
    editId = null;
    btnSubmit.textContent = "Thêm";
  } else {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    todos.push(newTodo);
  }

  input.value = "";
  render();
});

function render() {
  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? "completed" : "";
    li.textContent = todo.text + " ";

    const btnComplete = document.createElement('button');
    btnComplete.textContent = todo.completed ? "Hoàn tác" : "Hoàn thành";
    btnComplete.onclick = () => toggleComplete(todo.id);

    const btnEdit = document.createElement('button');
    btnEdit.textContent = "Sửa";
    btnEdit.onclick = () => editTodo(todo.id);

    const btnDelete = document.createElement('button');
    btnDelete.textContent = "Xóa";
    btnDelete.onclick = () => deleteTodo(todo.id);

    li.appendChild(btnComplete);
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  input.value = todo.text;
  editId = id;
  btnSubmit.textContent = "Cập nhật";
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}
