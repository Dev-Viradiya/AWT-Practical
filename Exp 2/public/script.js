let tasks = [];

// Load from server on startup
async function loadFromServer() {
    const response = await fetch('/tasks');
    tasks = await response.json();
    renderLists();
}

// Add Task Function
async function addTask() {
    const title = document.getElementById('taskInput').value;
    const deadline = document.getElementById('dateInput').value;

    if (title === '') {
        alert("Please enter a task name!");
        return;
    }

    const newTask = {
        title: title,
        dueDate: deadline || "No deadline",
        status: "pending" 
    };

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });

    if (response.ok) {
        document.getElementById('taskInput').value = '';
        document.getElementById('dateInput').value = '';
        loadFromServer();
    }
}

// Toggle Task Status
async function toggleStatus(id) {
    const task = tasks.find(t => t.id === id);
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });

    loadFromServer();
}

// Delete Task
async function deleteTask(id) {
    await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });
    loadFromServer();
}

function renderLists() {
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');
    
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    let pCount = 0;
    let cCount = 0;

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <h3>${task.title}</h3>
            <p>📅 Deadline: ${task.dueDate}</p>
            <div class="btn-group">
                <button class="${task.status === 'completed' ? 'undo-btn' : 'done-btn'}" onclick="toggleStatus(${task.id})">
                    ${task.status === 'completed' ? 'Move to Pending' : 'Mark as Done'}
                </button>
                <button class="del-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        if (task.status === 'completed') {
            completedList.appendChild(card);
            cCount++;
        } else {
            pendingList.appendChild(card);
            pCount++;
        }
    });

    document.getElementById('pendingCount').innerText = pCount;
    document.getElementById('completedCount').innerText = cCount;
}

document.getElementById('addBtn').addEventListener('click', addTask);
loadFromServer();
