"use-strict";

const tasks_list = document.querySelector(".list-wrapper");
const todo_input = document.querySelector(".task-input");
const task_counter = document.querySelector(".tasks-number");
const clear_btn = document.querySelector(".clear-btn");
const active_btn = document.querySelector(".active-tasks-filter");
const completed_btn = document.querySelector(".completed-tasks-filter");
const all_btn = document.querySelector(".all-tasks-list");

class Task {
  constructor(content, completed = false, id) {
    this.content = content;
    this.completed = completed;
    this.id = new Date().getMilliseconds();
    this.html = this.buildTaskHtml();
  }

  buildTaskHtml() {
    const html = `<div class="task-wrapper" data-id="${this.id}">
    <div class="todo-wrapper">
      <input type="checkbox" name="complete" data-id="${this.id}" />
      <p class="description">${this.content}</p>
    </div>
    <button class="del-btn" data-id="${this.id}">&#9747;</button>
  </div>`;
    return html;
  }
}
localStorage.setItem("task_arr", JSON.stringify([]));

class ToDoApp {
  #task_arr = JSON.parse(this.getlocalStorage());
  constructor() {
    todo_input.addEventListener("keydown", this.addTaskToList.bind(this));
    tasks_list.addEventListener("change", this.handleCheckboxChange.bind(this));
    tasks_list.addEventListener("click", this.deleteTask.bind(this));
    clear_btn.addEventListener("click", this.clearCompletedTasks.bind(this));
    active_btn.addEventListener("click", this.activeTasksFilter.bind(this));
    all_btn.addEventListener("click", this.listAllTasks.bind(this));

    completed_btn.addEventListener(
      "click",
      this.completedTasksFilter.bind(this)
    );
    // tasks_list
    this.listAllTasks();
  }
  addTaskToList(e) {
    if (!(e.key === "Enter" || e.keyCode === 13)) return;
    const task = new Task(todo_input.value);
    this.#task_arr.push(task);
    this.setlocalStorage(this.#task_arr);
    this.listAllTasks();
    todo_input.value = "";
  }

  setlocalStorage(arr) {
    localStorage.clear();
    localStorage.setItem("task_arr", JSON.stringify(arr));
  }

  getlocalStorage() {
    return localStorage.getItem("task_arr");
  }

  listAllTasks() {
    let task_arr = JSON.parse(this.getlocalStorage());
    if (!task_arr) return;

    tasks_list.innerHTML = "";
    task_arr.forEach((task) => {
      tasks_list.insertAdjacentHTML("beforeend", task.html);
    });
    this.updateTasksNumber(task_arr.length);
  }

  handleCheckboxChange(e) {
    if (e.target.name === "complete") {
      // Check if the target is a checkbox

      const taskWrapper = e.target.closest(".task-wrapper");
      const description = taskWrapper.querySelector(".description");

      const task = this.#task_arr.find(
        (task) => task.id == taskWrapper.dataset.id
      );

      if (e.target.checked) {
        task.completed = true;
        description.style.textDecoration = "line-through";
      } else {
        task.completed = false;
        description.style.textDecoration = "none";
      }
    }
  }

  deleteTask(e) {
    // e.preventDefault();
    if (e.target.className === "del-btn") {
      const index = this.#task_arr.findIndex(
        (task) => task.id == e.target.dataset.id
      );
      this.#task_arr.splice(index, 1);
      this.setlocalStorage(this.#task_arr);

      this.listAllTasks();
    }
  }

  updateTasksNumber(num = 0) {
    task_counter.textContent = `${num} items left`;
  }

  clearCompletedTasks(e) {
    e.preventDefault();
    console.log(this.#task_arr);

    let task_arr = JSON.parse(this.getlocalStorage());
    console.log(task_arr);
    if (!task_arr) return;
    this.#task_arr = task_arr.filter((task) => task.completed === false);
    console.log(this.#task_arr);
    this.setlocalStorage(this.#task_arr);
    this.listAllTasks();
  }

  activeTasksFilter() {
    const tasksList = Array.from(document.querySelectorAll(".task-wrapper"));
    console.log(tasksList);
    tasksList.forEach((taskEl) => {
      const task = this.#task_arr.find((task) => task.id == taskEl.dataset.id);
      if (!task) return;
      if (task.completed === true) {
        taskEl.classList.add("hidden");
      }
    });
  }
  completedTasksFilter() {
    const tasksList = Array.from(document.querySelectorAll(".task-wrapper"));
    console.log(tasksList);
    tasksList.forEach((taskEl) => {
      const task = this.#task_arr.find((task) => task.id == taskEl.dataset.id);
      if (!task) return;
      if (task.completed === false) {
        taskEl.classList.add("hidden");
      }
    });
  }
  // allTasks() {
  //   this.listAllTasks();
  // }
}

const todoapp = new ToDoApp();
