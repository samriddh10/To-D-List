// Function to fetch tasks from backend and display them
async function fetchAndDisplayTasks() {
  try {
    const response = await fetch("http://localhost:3000/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks
    tasks.forEach((task) => {
      const newlist = document.createElement("li");
      newlist.style.color = "white";
      const newItem = document.createElement("div"); //div 1
      newItem.setAttribute("class", "list-item");
      const operation = document.createElement("div"); //div 2
      operation.setAttribute("class", "operation");
      newItem.style.color = "white";
      newItem.innerText = task.title;
      newItem.appendChild(operation);
      newlist.appendChild(newItem);
      taskList.appendChild(newlist);
      //delete button
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      operation.appendChild(deleteButton);
      deleteButton.setAttribute("id", "deleteButton");
      deleteButton.onclick = function (event) {
        event.target.parentElement.parentElement.parentElement.remove();
      };

      //done button
      let doneButton = document.createElement("button");
      doneButton.innerText = "Done";
      operation.appendChild(doneButton);
      doneButton.setAttribute("id", "doneButton");

      doneButton.onclick = function () {
        if (newItem.style.color === "green") {
          newItem.style.color = "white";
          doneButton.innerText = "Done";
          doneButton.style.backgroundColor = "rgb(26, 208, 47)";
        } else {
          newItem.style.color = "green";
          doneButton.innerText = "✅";
          doneButton.style.backgroundColor = "white";
        }
      };

      //up button
      let upButton = document.createElement("button");
      upButton.innerText = "↑";
      operation.appendChild(upButton);

      upButton.onclick = function (event) {
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
          event.target.parentElement.parentElement.parentElement,
          event.target.parentElement.parentElement.parentElement.previousSibling
        );
      };
      //DOWN button
      let downButton = document.createElement("button");
      downButton.innerText = "↓";
      operation.appendChild(downButton);

      downButton.onclick = function (event) {
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
          event.target.parentElement.parentElement.parentElement.nextSibling,
          event.target.parentElement.parentElement.parentElement
        );
      };
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Function to handle "List Tasks" button click
document.getElementById("btnListTasks").addEventListener("click", async () => {
  fetchAndDisplayTasks(); // Fetch and display tasks when the button is clicked
});

// Function to handle "Add Task" button click
document.getElementById("btnAdd").addEventListener("click", async () => {
  try {
    const taskTitle = document.getElementById("newTask").value;
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: taskTitle,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    // Do not refresh the task list here, wait for the "List Tasks" button click
  } catch (error) {
    console.error("Error adding task:", error);
  }
});
