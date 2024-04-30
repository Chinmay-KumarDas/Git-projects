const inpt = document.getElementById('inpt');
const lst = document.getElementById('list');

var tasks = [];

function updateTasks() {
    const tks = document.querySelectorAll('li>input');
    tasks = [];
    tks.forEach((input_task) => {
        if (input_task.parentElement.classList.contains("done"))
            tasks.push({ task: input_task.value, done: true });
        else
            tasks.push({ task: input_task.value, done: false });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function pushTask() {
    if (inpt.value === '') {
        alert("Can't do nothing: type some text");
    } else {
        const newTask = document.createElement("li");
        const task = document.createElement("input");
        task.value = inpt.value;
        newTask.appendChild(task);
        lst.appendChild(newTask);
        inpt.value = '';

        const cross = document.createElement('span');
        cross.innerHTML = "\u00d7";
        newTask.appendChild(cross);
        
        task.addEventListener("input", updateTasks);
    }
    updateTasks();
}

lst.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    updateTasks();
}, false);


function getList() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((taskData) => {
        const newTask = document.createElement("li");
        const task = document.createElement("input");
        task.value = taskData.task;
        newTask.appendChild(task);
        lst.appendChild(newTask);

        if (taskData.done) {
            newTask.classList.add("done");
        }

        const cross = document.createElement('span');
        cross.innerHTML = "\u00d7";
        newTask.appendChild(cross);
        
        task.addEventListener("input", updateTasks);
    });
}

getList();
