const uri = 'https://localhost:7272/api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem(event) {
    event.preventDefault();
    const addNameText = document.getElementById('add-name');

    const item = {
        isComplete: false,
        name: addNameText.value.trim()
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameText.value = '';
        })
        .then(() => {
            displayToast('Todo item created successfully', 'bg-success');
        })
        .catch(error => {
            console.error('Unable to update item.', error);
            displayToast('Error occurred while creating the todo item.', 'bg-danger');
        });
}

function deleteItem(id) {
    if (!confirm('Are you sure?')) return;

    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .then(() => {
            displayToast('Todo item deleted successfully', 'bg-success');
        })
        .catch(error => {
            console.error('Unable to update item.', error);
            displayToast('Error occurred while deleting the todo item.', 'bg-danger');
        });
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem(event) {
    event.preventDefault();
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .then(() => {
            displayToast('Todo item updated successfully', 'bg-success');
        })
        .catch(error => {
            console.error('Unable to update item.', error);
            displayToast('Error occurred while updating the todo item.', 'bg-danger');
        });

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function displayToast(message, toastClass) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${toastClass} show`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    const toastBodyContainer = document.createElement('div');
    toastBodyContainer.className = 'd-flex';

    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.textContent = message;

    const toastButton = document.createElement('button');
    toastButton.classList.add('btn-close', 'me-2', 'm-auto');
    toastButton.setAttribute('type', 'button');
    toastButton.setAttribute('data-bs-dismiss', 'toast');
    toastButton.setAttribute('aria-label', 'Close');

    toastBodyContainer.appendChild(toastBody);
    toastBodyContainer.appendChild(toastButton);
    toast.appendChild(toastBodyContainer);
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function displayCount(itemCount) {
    const name = itemCount === 1 ? 'todo' : 'todos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function displayItems(data) {
    const todosContainer = document.getElementById('todos');
    todosContainer.innerHTML = '';

    displayCount(data.length);

    data.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('todo-card');

        let isCompleteCheckboxLabel = document.createElement('label');
        isCompleteCheckboxLabel.classList.add('custom-checkbox');

        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let checkmarkSpan = document.createElement('span');
        checkmarkSpan.classList.add('checkmark');

        isCompleteCheckboxLabel.appendChild(isCompleteCheckbox);
        isCompleteCheckboxLabel.appendChild(checkmarkSpan);

        let taskName = document.createElement('span');
        taskName.classList.add('task-name');
        taskName.textContent = item.name;

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        card.appendChild(isCompleteCheckboxLabel);
        card.appendChild(taskName);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        todosContainer.appendChild(card);
    });

    todos = data;
}
