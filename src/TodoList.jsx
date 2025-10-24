import { useEffect, useRef, useState } from "react"

function TodoList() {
// State to hold the array of task objects : [{text: string, completed: boolean}]
const [tasks, setTasks] = useState([]);
// State to hold the text of the task currently being typed or edited
const [newTask, setNewTask] = useState("");
// State to track which task index is currently being edited (-1 means no task is being edited)
const [editIndex, setEditIndex] = useState(-1);
// Ref to focus the input field when the component mounts or when editing starts
const inputRef = useRef(null);
// Ref to prevent the `tasks` useEffect from running on the initial mount,
// which prevents overwriting localStorage with the initial empty array [].
const isInitialMount = useRef(true);


// Effect to Load Tasks from localStorage on component mount.
useEffect(() => {
    try {
        const storedTasks = localStorage.getItem("tasks");

        if(typeof storedTasks === "string" && storedTasks.trim() !== '') {
            const parsedTasks = JSON.parse(storedTasks);

            if(Array.isArray(parsedTasks)) {
                console.log("Tasks loaded successfully:", parsedTasks);
                setTasks(parsedTasks);
                return;
            }
        }
        // Fallback for empty/invalid storage
        console.log("INFO: localStorage 'tasks' key was empty or invalid. Initializing empty array.");
        setTasks([]);
    } catch(error) {
        console.error("Failed to parse or load tasks from localStorage. Data may be corrupt.", error);
        setTasks([]);
    }
}, []); // Empty dependency array ensures this runs only ONCE on mount


/**
* Effect to Save Tasks to localStorage whenever the `tasks` state changes.
* Uses isInitialMount ref to skip the very first render and avoid clearing saved data.
*/
useEffect(() => {
    // Skip the first render to prevent overwriting saved data with the initial empty state.
    if (isInitialMount.current) {
        isInitialMount.current = false; // Set to false after the first run
        console.log("INFO: Skipping initial save to prevent overwriting localStorage.");
        return; // Stop the execution of the effect
    }

    // 2. If it's not the initial mount, proceed with saving
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("SAVED: Tasks saved to localStorage:", tasks.length, "items");
    
}, [tasks]); // Runs whenever the tasks array is updated

// Effect to focus the input field when the edit mode is activated.
useEffect(() => {
    if(editIndex !== -1) inputRef.current.focus();
}, [editIndex]);

function handleInputChange(event) {
    setNewTask(event.target.value);
}

function addTask() {
    if(newTask.trim() != "") {
        // Use functional state update to safely append a new task object
        setTasks(t => [...t, {text: newTask, completed: false}]);
        setNewTask("");
    }
}

function deleteTask(index) {
    // Filter out the task at the specified index
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
    // Clear edit state regardless of which task was deleted (better UX)
    setEditIndex(-1);
    setNewTask("");
}

function editTask(index) {
    setEditIndex(index);
    setNewTask(tasks[index].text);
}

function updatedTask() {
    if (newTask.trim() !== "") {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = {
            ...updatedTasks[editIndex], 
            text: newTask
        };
        setTasks(updatedTasks);

        setEditIndex(-1);
        setNewTask("");
    }
}

function cancelEdit() {
    setEditIndex(-1);
    setNewTask("");
}

function toggleTaskCompleted(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
}

function handleKeyDown(event) {
    if(event.key === "Enter") {
        if(editIndex === -1) {
            addTask();
        } else {
            updatedTask();
        }
    }
}

// for debugging purpose
console.log("Current tasks length for rendering:", tasks.length);

return (
    <div className="app-container">
        <div className="todo-card">
            <h1 className="app-title">To-Do-List</h1>
            <div className="input-container">
                <input
                    type="text" 
                    placeholder={editIndex === -1 ? "Enter a new task..." : "Edit your task..."}
                    ref={inputRef}
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="task-input"
                />
                {editIndex === -1 ? (
                    <button
                    onClick={addTask}
                    className="btn btn-add"
                    >
                    Add
                    </button>
                ) : (
                    <div className="edit-buttons">
                    <button 
                        onClick={updatedTask}
                        className="btn btn-update"
                    >
                        Update
                    </button>
                    <button 
                        onClick={cancelEdit}
                        className="btn btn-cancel"
                    >
                        Cancel
                    </button>
                    </div>  
                )}
            </div>
            <ol className="task-list">
                {tasks.length === 0 ? (
                <li className="empty-message">No tasks yet. Add one above!</li>
                ) : (
                tasks.map((task, index) => 
                    <li 
                    key={index}
                    className="task-item"
                    >
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompleted(index)}
                        className="task-checkbox"
                    />
                    <span className={task.completed ? 'task-text completed' : 'task-text'}>
                        {task.text}
                    </span>
                    <button 
                        onClick={() => editTask(index)}
                        className="btn btn-edit"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => deleteTask(index)}
                        className="btn btn-delete"
                    >
                        Delete
                    </button>
                    </li> 
                )
            )}
            </ol>
        </div>
    </div>
    )
}

export default TodoList