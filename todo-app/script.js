"use-strict";

const tasks_list = document.querySelector(".list-wrapper");
const todo_input = document.querySelector(".task-input");

class Task {
  constructor(content, completed = false, id) {
    this.content = content;
    this.completed = completed;
    this.id = id;
    this.html = this.buildTaskHtml();
  }

  buildTaskHtml() {
    const html = `<div class="task-wrapper">
    <div class="todo-wrapper">
      <input type="checkbox" name="complete" id="complete" />
      <p class="description">${this.content}</p>
    </div>
    <a href="" class="del-btn">&#9747;</a>
  </div>`;
    return html;
  }
}

class ToDoApp {
  #task_arr = [];
  constructor() {
    todo_input.addEventListener("keydown", this.addTaskToList.bind(this));
    tasks_list.addEventListener("change", this.handleCheckboxChange.bind(this));
    this.listAllTasks();
  }
  addTaskToList(e) {
    if (!(e.key === "Enter" || e.keyCode === 13)) return;
    const task = new Task(todo_input.value);
    this.#task_arr.push(task);
    this.setlocalStorage();
    tasks_list.insertAdjacentHTML("beforeend", task.html);
    todo_input.value = "";
  }

  setlocalStorage() {
    localStorage.setItem("task_arr", JSON.stringify(this.#task_arr));
  }

  getlocalStorage() {
    return localStorage.getItem("task_arr");
  }

  listAllTasks() {
    const task_arr = JSON.parse(this.getlocalStorage());
    task_arr.forEach((task) => {
      tasks_list.insertAdjacentHTML("beforeend", task.html);
    });
  }

  handleCheckboxChange(e) {
    if (e.target.name === "complete") {
      // Check if the target is a checkbox
      const taskWrapper = e.target.closest(".task-wrapper");
      const description = taskWrapper.querySelector(".description");

      if (e.target.checked) {
        description.style.textDecoration = "line-through";
      } else {
        description.style.textDecoration = "none";
      }
    }
  }
}

const app = new ToDoApp();
