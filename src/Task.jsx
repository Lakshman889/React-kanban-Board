import { useState } from "react";

function Task(){
    const [tasks,setTasks]=useState([{Task:"eat",complete:true},{Task:"sleep",complete:false}]);
    const [newTask,setnewTask]=useState("");
    let dragIndex=null;
    function changeTask(e){
      setnewTask(e.target.value);
    }
    function addTask(){
      if(newTask.trim()==="") return;
      setTasks((t)=>[...t,{Task:newTask,complete:false}]);
      setnewTask("");
    }
    function deleteTask(idx){
      const updateTasks=tasks.filter((t,i)=>i!==idx);
      setTasks(updateTasks);
    }
    function toggleTask(idx){
     const updateTasks= tasks.map((t,i)=>i===idx?{...t,complete:!t.complete}:t);
      setTasks(updateTasks);
    }
    function moveUp(idx){
      if(idx>0){
        const updateTasks=tasks;
          
      const temp=updateTasks[idx-1];
        updateTasks[idx-1]=updateTasks[idx];
        updateTasks[idx]=temp;
        setTasks([...updateTasks]);
      }
    }
     function moveDown(idx){
      if(idx<tasks.length-1){
         
        const updateTasks=tasks;
       
        const temp=updateTasks[idx+1];
        updateTasks[idx+1]=updateTasks[idx];
        updateTasks[idx]=temp;
      
        setTasks([...updateTasks]);
      }
    }
    const taskLists=tasks.map((t,idx)=>
                             <li  key={idx}  
                              draggable
                              onDragStart={()=>setDragIndex(idx)}
                             onDragOver={(e)=>e.preventDefault()}
                             onDrop={()=>updateItems(idx)}
                             >
                              <input type="checkbox"  checked={t.complete} onChange={()=>toggleTask(idx)}/>
                              <span  style={{textDecoration:t.complete?"line-through":"none"}}>{t.Task}</span>
                              
                              <button className="remove" onClick={()=>deleteTask(idx)}>remove</button>
                              <button onClick={()=>moveUp(idx)}>👆</button>
                               <button onClick={()=>moveDown(idx)}>👇</button>
                              </li>)
    
    function setDragIndex(idx){
      dragIndex=idx;
    }

    function updateItems(dropIndex){
      const updateTasks=[...tasks];
     const dragTask=updateTasks[dragIndex];
     updateTasks.splice(dragIndex,1);
     updateTasks.splice(dropIndex,0,dragTask);
      setTasks(updateTasks);
    }
  
    return(
      < div className="todo-container">
        <div>
      <h1>Todo List App </h1>
      <input type="text" value={newTask} onChange={changeTask}/>
      
      <button className="add-task"onClick={addTask}>Add</button>
      </div>
      <ol
      onDragEnd={ondrag}
     
      >
        {taskLists}
      </ol>
      </div>
    );
}

export default Task;