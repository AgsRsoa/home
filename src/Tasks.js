import React, {useState, useEffect} from 'react';
import uuid from 'uuid/v4';

//Persister la liste de tâches store the task and complete task
//read the task or complete 
const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY'
const storeTasks = ({tasks,completedTasks}) =>{
    localStorage.setItem(
        TASKS_STORAGE_KEY,
       JSON.stringify({tasks, completedTasks}) 
    );
}

const readStoredTasks = () =>{
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
    return tasksMap ? tasksMap : {tasks:[],completedTasks:[]}
}

function Tasks() {
   

    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);//null at the begining, prefer returning an empty array
    const [completedTasks,setCompletedTasks] = useState(storedTasks.completedTasks);

    useEffect(()=>{
        storeTasks({tasks, completedTasks})
    })

    const updateTaskText = (event) =>{

        setTaskText(event.target.value);
    }

    const addTask = () =>{
        setTasks([...tasks, {taskText, id: uuid()}]) 
        /* nouveau tableau [] et ...tasks et pas tasks.push() car modifie le tableau pré-existant.
        taskText devient objet car install de uuid pour générer un id unique donc {taskText, id: uuid()}
        */
    }

    const completeTask = (completedTask) =>()=>{
        //remove task from tasks and put it in completedTasks
        setCompletedTasks([...completedTasks,completedTask])
        setTasks(tasks.filter(task => task.id !== completedTask.id))
    }

    console.log('tasks' ,tasks)
    console.log('completedTasks' ,completedTasks)

    const deleteTask = (taskToDelete) =>() =>{
        setCompletedTasks(completedTasks.filter(task => task.id !== taskToDelete.id))
    }

    return(<>
    <div>
        <h3>Tasks</h3>
        <div className = 'form'>
            <input value={taskText} onChange={updateTaskText}/>
            <button onClick={addTask}>Add task</button>
        </div>
        <div className = 'task-list'>
            {tasks.map(task=>{
                const {id, taskText} = task;
                return (<div key={id} onClick={completeTask(task)}>{taskText}</div>
            /*As the completeTasks is called in JSX,this function is going to be called right away 
            when component will be used. Then it calls set... so re-render then completeTask etc. Donc 
        not a call to the function in the {} but a function */);

            })}
        </div>
        <div className='completed-list'>
        {
            completedTasks.map(ctask =>{
                const {id, taskText} = ctask;
                return(<div key={id}>{taskText}<span onClick={deleteTask(ctask)} className='delete-task'>x</span></div>);
            })
        } </div>
    </div>
    </>)
}

export default Tasks;