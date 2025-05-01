const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo.text;

    li.appendChild(p);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "8px";
    li.insertBefore(checkbox, p);

    checkbox.checked = todo.done;
    if (todo.done) p.classList.add("done");
    
    checkbox.addEventListener("change", () => {
      p.classList.toggle("done", checkbox.checked);
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoIndex = todos.findIndex((todo) => todo.text === p.innerHTML);
      if (todoIndex !== -1) {
        todos[todoIndex].done = checkbox.checked;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "EDIT";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
};

const saveToLocalStorage = () => {
  const todos = [];
  const listItems = todoList.querySelectorAll("li");

  listItems.forEach((li) => {
    const p = li.querySelector("p");
    const checkbox = li.querySelector("input");
    todos.push({
      text: p.innerHTML,
      done: checkbox.checked,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Add an item");
    return;
  }

  if (addBtn.value == "SAVE") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
    saveToLocalStorage();
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;

    li.appendChild(p);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "8px";
    li.insertBefore(checkbox, p);

    checkbox.addEventListener("change", () => {
      p.classList.toggle("done", checkbox.checked);
      saveToLocalStorage();
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "EDIT";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    // const doneBtn = document.createElement("button");
    // doneBtn.innerText = "DONE";
    // doneBtn.classList.add("btn", "doneBtn");
    // li.appendChild(doneBtn);

    // doneBtn.addEventListener("click", () => {
    //   p.classList.toggle("done");
    //   doneBtn.innerText = p.classList.contains("done") ? "UNDO" : "DONE";
    // });

    todoList.appendChild(li);
    inputBox.value = "";

    saveToLocalStorage();
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML == "DELETE") {
    todoList.removeChild(e.target.parentElement);
    saveToLocalStorage();
  }

  if (e.target.innerHTML == "EDIT") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "SAVE";
    editTodo = e;
  }
};

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);

document.addEventListener("DOMContentLoaded", loadTodos);
