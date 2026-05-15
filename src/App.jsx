import { useState,useEffect } from "react";

function App(){

    const [Tasks,setTasks]=useState(()=>{
        
        const saveItems=localStorage.getItem("kanbantasks");

        return saveItems?JSON.parse(saveItems):{
        todo:[{id:1,task:"eat"},{id:2,task:"sleep"}],
        doing:[{id:3,task:"coding"},{id:4,task:"study"}],
        done:[{id:5,task:"movies"},{id:6,task:"reels"}]
    }});

    useEffect(()=>{
        localStorage.setItem("kanbantasks",JSON.stringify(Tasks))
    },[Tasks])
    const [newTask,setNewTask]=useState("");
    const [dragTask,setDragTask]=useState("");
    
    function addTask(){
        if(newTask==="") return;
        const task={id:Date.now(),task:newTask};
        setTasks({...Tasks,todo:[...Tasks.todo,task]});
        setNewTask("");
    }
    function deleteTask(id,column){
        const updateTasks=Tasks[column].filter((t)=>t.id!==id);
        setTasks({...Tasks,[column]:updateTasks});
    }
    function handleDragTask(idx,sourcecolumn){
       
        setDragTask({sourcecolumn,idx});
        
      
    }
    function handleDropTask(targetcolumn){

        if(!dragTask) return;
        const {sourcecolumn,idx}=dragTask;
        
        if(sourcecolumn===targetcolumn){
            setDragTask(null);
            return;
        }
        const task=Tasks[sourcecolumn][idx];
        
        const sourceTasks=Tasks[sourcecolumn].filter(t=>t.id!==task.id);

        const targetTasks=[...Tasks[targetcolumn],task];

        setTasks({...Tasks,[sourcecolumn]:sourceTasks,[targetcolumn]:targetTasks});
        
       setDragTask(null);
    }

    return(
        <div className="app-container">
        <h1>Kanban Box</h1>
        <div className="input-container">
            <input  type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)}/>
        <button onClick={addTask}>Add Task</button>
        </div>
        
        <div className="kanban">
            <TaskLists   column="todo" title="Todo" 
                    tasks={Tasks.todo} 
                        deleteTask={deleteTask} handleDropTask={handleDropTask}
                        handleDragTask={handleDragTask}/>
            <TaskLists column="doing" title="Doing"
            tasks={Tasks.doing}
            deleteTask={deleteTask}
            handleDropTask={handleDropTask}
            handleDragTask={handleDragTask}/>
            <TaskLists column="done" title="Done" tasks={Tasks.done} 
            deleteTask={deleteTask}  handleDropTask={handleDropTask}
                        handleDragTask={handleDragTask}/>
        </div>
        </div>
    );
}

function TaskLists({column,title,tasks,deleteTask, handleDropTask, handleDragTask}){
    return(
    <div className="Task-container" onDragOver={(e)=>e.preventDefault()} onDrop={()=>handleDropTask(column)} >
        <h2>{title}</h2>
        {tasks.map((t,idx)=>
        <div className="Task"key={t.id} onDragStart={()=>handleDragTask(idx,column)}draggable>
            {t.task}
        <button onClick={()=>deleteTask(t.id,column)}>delete</button>
        </div>
        )}
    </div>)
}

export default App;
