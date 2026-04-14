const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    done: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span
        onclick="toggleTask(${index})"
        style="
          text-decoration: ${task.done ? "line-through" : "none"};
          opacity: ${task.done ? "0.5" : "1"};
          cursor: pointer;
        "
      >
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">Verwijder</button>
    `;
    taskList.appendChild(li);
  });
}
