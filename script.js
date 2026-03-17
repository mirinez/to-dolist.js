/* script.css — To-Do List
   Míriam Domínguez Martínez
*/

/*
  DOM ELEMENT REFERENCES
*/

const inputField = document.getElementById('new-task');     // Input field where user types tasks
const addButton = document.getElementById('add-task');      // Button to add tasks
const taskList = document.getElementById('task-list');      // Container where tasks are displayed
const taskCount = document.getElementById('task-count');    // Element showing task counter


/* 
  UPDATE TASK COUNTER FUNCTION
*/

function updateTaskCount() {
  // Count all task items (li elements) in the list
  const count = taskList.querySelectorAll('li').length;
  
  // Update counter text with proper grammar (1 task vs 2 tasks)
  taskCount.textContent = count === 1 ? '1 task' : count + ' tasks';
  
  // Show empty state message when no tasks exist
  if (count === 0) {
    taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one to get started!</div>';
  }
}


/*
  ADD TASK FUNCTION
*/

function addTask() {
  // Get the task text from input field and trim whitespace
  const taskValue = inputField.value.trim();
  
  // Validate: don't add empty tasks
  if (taskValue === '') {
    // Focus input to prompt user to type something
    inputField.focus();
    return; // Exit function early if input is empty
  }
  
  // Remove the empty state message if it exists
  const emptyState = taskList.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
  
/*
  CREATE NEW TASK ELEMENT
*/
  
  // Create a new <li> element using createElement()
  const newTask = document.createElement('li');
  
  // Set the HTML content of the new task
  // Includes the task text and a delete button
  newTask.innerHTML = `
    <span>${taskValue}</span>
    <button class="delete-btn">✕</button>
  `;
  
/*
  ADD DELETE FUNCTIONALITY
*/
  
  // Get reference to the delete button we just created
  const deleteBtn = newTask.querySelector('.delete-btn');
  
  // Add click event listener to delete button
  deleteBtn.addEventListener('click', function() {
    // Remove the task item from the DOM
    newTask.remove();
    
    // Update the task counter after deletion
    updateTaskCount();
  });
  
/*
  ADD TASK TO LIST & UPDATE UI
*/
  
  // Add the new task to the task list using appendChild()
  // appendChild() adds the element as the last child
  taskList.appendChild(newTask);
  
  // Clear the input field for the next task
  inputField.value = '';
  
  // Focus back on input field for better UX
  // User can immediately start typing the next task
  inputField.focus();
  
  // Update task counter to reflect the new count
  updateTaskCount();
}


/*
  EVENT LISTENERS
*/

addButton.addEventListener('click', addTask);

inputField.addEventListener('keypress', function(event) {
  // Check if the pressed key is Enter
  if (event.key === 'Enter') {
    // Trigger the add task function
    addTask();
  }
});


/*
  INITIALIZATION
*/

inputField.focus();
