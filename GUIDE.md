# To-Do List - Project Guide
**Míriam Domínguez Martínez · DBE Academy · 2026**

---

## 1. Overview

A lightweight, single-page To-Do List built with vanilla HTML, CSS and JavaScript — no frameworks, no dependencies. All interactivity lives in one JS file; all styling in one CSS file.

| Feature      | Detail                                  |
|--------------|-----------------------------------------|
| Stack        | HTML · CSS · Vanilla JavaScript         |
| Files        | index.html, styles.css, script.js       |
| State        | DOM only — no localStorage, no backend  |
| Responsive   | Mobile-first, one breakpoint at 640px   |
| Accessible   | Keyboard navigation, semantic HTML      |

---

## 2. File Structure

The project uses a flat structure — all three core files sit in the root folder.

```
todo-list/
├── index.html      ← markup & page skeleton
├── styles.css      ← all visual styling
└── script.js       ← all interactivity
```

### index.html

Main page skeleton. Contains the container, task input group, task list, counter, and footer. JavaScript is loaded at the bottom of `<body>` so the DOM is ready before the script runs.

> **Key element IDs:** `new-task` (input) · `add-task` (button) · `task-list` (ul) · `task-count` (counter)

### styles.css

Divided into nine clearly labelled sections using comment banners that match the style used throughout the project:

| Section | Selector / rule       | Purpose                  |
|---------|-----------------------|--------------------------|
| 1       | `* { box-sizing }`    | Global reset             |
| 2       | `.container`          | Centred layout, max-width 500px |
| 3       | `h1, .task-count`     | Typography               |
| 4       | `input, button`       | Input group styling      |
| 5       | `ul, li`              | Task list & items        |
| 6       | `.delete-btn`         | Delete (✕) button        |
| 7       | `.empty-state`        | No-tasks placeholder     |
| 8       | `@media ≤ 640px`      | Mobile overrides         |
| 9       | `footer`              | Footer styles            |

### script.js

Divided into five labelled blocks, each with a descriptive comment header:

| Block                  | What it does                                           |
|------------------------|--------------------------------------------------------|
| DOM References         | Caches the four element references once at the top     |
| `updateTaskCount()`    | Recounts `<li>` elements; shows empty-state if zero    |
| `addTask()`            | Validates input, builds `<li>`, wires delete, appends  |
| Event Listeners        | `click` on add-task; `keypress` Enter on input         |
| Initialization         | `inputField.focus()` on load                           |

---

## 3. How It Works

### 3.1 Adding a Task

The flow every time the user clicks Add or presses Enter:

```js
/* script.js — addTask()
*/

function addTask() {
  // Get the task text from input field and trim whitespace
  const taskValue = inputField.value.trim();

  // 1. Validate — exit early if empty
  if (taskValue === '') {
    inputField.focus();
    return;
  }

  // 2. Remove empty-state placeholder if present
  const emptyState = taskList.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  // 3. Build the <li> with task text + delete button
  const newTask = document.createElement('li');
  newTask.innerHTML = `
    <span>${taskValue}</span>
    <button class="delete-btn">✕</button>
  `;

  // 4. Wire up the delete button
  newTask.querySelector('.delete-btn')
    .addEventListener('click', () => {
      newTask.remove();
      updateTaskCount();
    });

  // 5. Append, clear input, focus, update counter
  taskList.appendChild(newTask);
  inputField.value = '';
  inputField.focus();
  updateTaskCount();
}
```

### 3.2 Updating the Counter

Called after every add or delete. Counts all `<li>` children and handles grammar:

```js
/* script.js — updateTaskCount()
*/

function updateTaskCount() {
  // Count all task items (li elements) in the list
  const count = taskList.querySelectorAll('li').length;

  // Proper grammar: "1 task" vs "2 tasks"
  taskCount.textContent = count === 1 ? '1 task' : count + ' tasks';

  // Restore empty-state when list is cleared
  if (count === 0) {
    taskList.innerHTML =
      '<div class="empty-state">No tasks yet. Add one to get started!</div>';
  }
}
```

### 3.3 Event Listeners

```js
/* script.js — Event Listeners
*/

// Click on the Add button
addButton.addEventListener('click', addTask);

// Press Enter inside the input field
inputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') addTask();
});
```

---

## 4. Styling Reference

### 4.1 Colour Palette

All colours are inline per selector — no CSS variables are used.

| Role             | Hex        | Used on                   |
|------------------|------------|---------------------------|
| Background page  | `#f5f5f5`  | `body`                    |
| White surface    | `#ffffff`  | cards, input, button      |
| Border           | `#dddddd`  | input, button, li         |
| Border hover     | `#999999`  | `input:hover`, `li:hover` |
| Accent green     | `#4CAF50`  | `input:focus` ring        |
| Text primary     | `#333333`  | h1, li, input             |
| Text secondary   | `#666666`  | `.task-count`             |
| Text muted       | `#999999`  | `.empty-state`            |
| Delete icon      | `#000000`  | `.delete-btn`             |

### 4.2 Responsive Breakpoint

One media query handles all mobile adjustments:

```css
/* styles.css
   8. RESPONSIVE DESIGN
*/

@media (max-width: 640px) {
  .container   { padding: 0 0.75rem; }
  h1           { font-size: 20px; }
  .input-group { gap: 6px; }
  input        { padding: 0.65rem; font-size: 14px; }
  button       { padding: 0.65rem 1rem; font-size: 14px; }
}
```

### 4.3 Comment Format

Every section in `styles.css` and `script.js` uses the same banner style. Copy this pattern when adding new sections:

```css
/* ========================================
   N. SECTION NAME
*/
```

---

## 5. Customisation

### 5.1 Change the Accent Colour

The green (`#4CAF50`) appears in two places in `styles.css`. Replace both to change the accent:

```css
/* styles.css — input focus state */

input:focus {
  border-color: #4CAF50;                        /* ← change here */
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1); /* ← and here   */
}
```

### 5.2 Add a New Feature to script.js

Follow the same block structure — add a labelled comment header and keep DOM references at the top:

```js
/*
  EDIT TASK FUNCTION
*/

function editTask(taskElement) {
  // ... implementation
}
```

### 5.3 Persist Tasks with localStorage

The current version is DOM-only: tasks disappear on refresh. To persist them, add these two functions and call them from `addTask()` and the delete listener:

```js
/*
  LOCALSTORAGE — SAVE & LOAD
*/

// Save all current tasks to localStorage
function saveTasks() {
  const tasks = [...taskList.querySelectorAll('li span')]
    .map(s => s.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks on page start
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
  saved.forEach(text => {
    inputField.value = text;
    addTask();
  });
}


/*
  INITIALIZATION
*/

inputField.focus();
loadTasks(); // ← add this line
```

---

## 6. Common Issues

| Problem                        | Solution                                                                                      |
|-------------------------------|-----------------------------------------------------------------------------------------------|
| Tasks disappear on refresh    | Expected — no persistence by default. See section 5.3 to add `localStorage`.                 |
| Button does nothing on click  | Check the console. Most likely `script.js` is not linked or the file path is wrong.           |
| Empty task gets added         | `addTask()` guards against empty strings with an early return. Check for whitespace-only input.|
| Counter shows wrong number    | `updateTaskCount()` counts `<li>` elements. If tasks are wrapped in a `<div>`, it will break. |
| Styles not loading            | Confirm the `<link>` href matches the exact filename (case-sensitive on Linux/macOS).         |
| "1 tasks" grammar bug         | The ternary in `updateTaskCount()` handles this. If it appears, the function was modified.    |

---

*© 2026 To-Do List · Míriam Domínguez Martínez · DBE Academy*
