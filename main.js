const seedData = [{
    id: createUniqueID(),
    name: "Open source code",
    done: true
}, {
    id: createUniqueID(),
    name: "Add functionality",
    done: false
}];

// Function to generate unique IDs. Ignore contents.
function createUniqueID() {
    var dt = new Date().getTime();
    var uniqueId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uniqueId;
}

// Helper function to retrieve data from Local Storage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Helper function to store data to Local Storage
function setToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentListItems() {
    return getFromStorage('todoItems');
}

function updateItems(items = []) {
    setToStorage('todoItems', items);
    renderList(items);
}


// Init method. Sets initial list items, if it was never initialized
function initialize() {
    setToStorage('todoItems', seedData);
    setToStorage('initialized', true);
}

// Main function, called as an "entry" point to the whole application
function main() {
    if (!getFromStorage('initialized')) {
        initialize();
    }

    const todoItems = getCurrentListItems();
    console.log(todoItems);

    // TODO: implement the rest (you can remove the line below)
    renderList(todoItems);
}

function addItem(name) {

    const todo = {
        name,
        done: false,
        id: createUniqueID(),
    };
    //Push the items above into the new array of todoItems

    // get current list from localStorage
    var currentList = getCurrentListItems()
    currentList.push(todo);
    updateItems(currentList);
    // push item to list
    // update list in localStorage
}

document.getElementById('addItem').addEventListener('click', function () {
    var input = document.getElementById('newItem')
    addItem(input.value)
    input.value = "";
})

// form.addEventListener(type, event => {
//     //Keeps the browser from submitting the form to the server
//     //which causes the page to refresh
//     event.preventDefault();

//     const input = document.querySelector('newItem');

//     //Invoke the following if the input is filled
//     //trim()gets rid of spaces before and after the input
//     const text = input.value.trim();
//     if (text !== '') {
//         addItem(name);
//         input.value = '';
//         input.focus();
//     }
// });

const list = document.querySelector('taskList');

// list.addEventListener('click', event => {
//     if (event.target.classList.contains('js-tick')) {
//         const itemKey = event.target.parentElement.dataset.key;
//         toggleDone(itemKey);
//     }

//     // add this `if` block
//     if (event.target.classList.contains('js-delete-todo')) {
//         const itemKey = event.target.parentElement.dataset.key;
//         deleteTodo(itemKey);
//     }
// });

// TODO: implement this
function removeItem(id) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}

// select the list element and trim all whitespace once there are no todo items left
//const list = document.querySelector('taskList');
//if (todoItems.length === 0) list.innerHTML = '';

function toggleDone(id) {
    var currentList = getCurrentListItems()
    updateItems(currentList.map(item => {
        if (item.id !== id) {
            return item
        } else {
            item.done = !item.done;
            return item
        }
    }));

    // Learn about:
    // ternary if operator ( condition ? true_branch : false_branch)
    // object spread in ES6
}

function renderList(todoItems = []) {
    // TODO: implement this
    var taskList = document.getElementById('taskList');
    console.log('1', taskList.children)
    taskList.innerHTML = ""
    console.log('2', taskList.children)
    for (let i = 0; i < todoItems.length; i++) {
        var listElement = document.createElement("li");
        listElement.textContent = todoItems[i].name;
        if (todoItems[i].done) {
            listElement.classList.add('done')
        }
        listElement.addEventListener('click', function () {
            toggleDone(todoItems[i].id)
        })
        taskList.appendChild(listElement);
    }
    console.log('3', taskList.children)
}

main();