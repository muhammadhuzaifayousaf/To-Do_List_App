let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const pendingList = document.getElementById('pending-tasks-list');
    const completedList = document.getElementById('completed-tasks-list');
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button onclick="toggleComplete(${index})"><i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i></button>
                <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        input.value = '';
        saveTasks();
        renderTasks();
    }
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Initialize theme
if (localStorage.getItem('darkMode') === 'true') {
    toggleTheme();
}

renderTasks();