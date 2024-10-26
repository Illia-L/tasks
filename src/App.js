import { useState } from 'react';

const initialTasks = [
  { id: 1, text: 'Buy groceries', completed: false },
  { id: 2, text: 'Clean the house', completed: true },
  { id: 3, text: 'Finish React project', completed: false },
  { id: 4, text: 'Read a book', completed: false },
  { id: 5, text: 'Exercise for 30 minutes', completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleMarkTaskDone(taskToMark) {
    const updatedTasks = tasks.map(task =>
      task.id === taskToMark.id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskToDelete) {
    const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);

    setTasks(updatedTasks);
  }

  return (
    <div className='app'>
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onMarkTaskAsDone={handleMarkTaskDone}
      />

      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [taskInput, setTaskInput] = useState('');

  function createTask(e) {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTaskInput('');

    onAddTask(newTask);
  }

  return (
    <form
      className='task-form'
      onSubmit={createTask}
    >
      <input
        className='task-input'
        type='text'
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
      />

      <button
        className='task-button'
        type='submit'
      >
        Add
      </button>
    </form>
  );
}

function TaskList({ tasks, onDeleteTask, onMarkTaskAsDone }) {
  return (
    <ul className='task-list'>
      {tasks.map(task => (
        <Task
          task={task}
          onDeleteTask={onDeleteTask}
          onMarkTaskAsDone={onMarkTaskAsDone}
          key={task.id}
        />
      ))}
    </ul>
  );
}

function Task({ task, onDeleteTask, onMarkTaskAsDone }) {
  return (
    <li className='task'>
      <label className='custom-checkbox'>
        <input
          type='checkbox'
          className='checkbox-input'
          checked={task.completed}
          onChange={() => onMarkTaskAsDone(task)}
        />
        <span className='checkbox-mark'></span>
      </label>

      <span className={`task-text ${task.completed ? 'done' : ''}`}>
        {task.text}
      </span>

      <button
        className='delete-button'
        onClick={() => onDeleteTask(task)}
      >
        Delete
      </button>
    </li>
  );
}
