import React,{useEffect, useState} from 'react';
import './App.css';
import { MdDeleteSweep } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const[isCompleteScreen,setIsCompleteScreen]=useState(false);

  const[alltodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);

  const handleAddTodo=()=>{
    let newTodo={
      title:newTitle,
      description:newDescription,
    };
    let updatedTodoArr=[...alltodos];
    updatedTodoArr.push(newTodo);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };

   const handleDeleteTodo=(index)=>{
    let reducedTodo=[...alltodos];
    reducedTodo.splice(index,1);
    setTodos(reducedTodo);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
   };

   const handlecomplete=(index)=>{
    let now =new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedDate= dd +'-'+mm+'-'+yyyy + 'at'+h+':'+m+':'+s;
    let filteredItem={
      ...alltodos[index],
      completedon:completedDate
    }
    let updatedCompletedTodoArr=[...completedTodos];
    updatedCompletedTodoArr.push(filteredItem);
    setCompletedTodos(updatedCompletedTodoArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedtodolist',JSON.stringify(updatedCompletedTodoArr));
   };

   const handlecompletedDeleteTodo	=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    setTodos(reducedTodo);
    localStorage.setItem('completedtodolist',JSON.stringify(reducedTodo));

   }
  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savecompleted=JSON.parse(localStorage.getItem('completedtodolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savecompleted){
      setCompletedTodos(savecompleted);
    }
  },[])
  return (
    <div className="App">
      <h1>Strawbeery's ToDos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What is the title"/>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What is the description "/>
          </div>
          <div className="todo-input-item">
            <button type='button' onClick={handleAddTodo} className='primarybtn'>Add</button>
          </div>
          </div>
       
        <div className='btnarea'>
          <button type='button' className={`primarybtn1 ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Get Todos</button>
          <button type='button' className={`primarybtn1 ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed Todos</button>
        </div>
        <div className="todo-list">

          {isCompleteScreen===false && alltodos.map((item,index)=>{
              return(
                <div className="todolist-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p> 
          
          
          <div>
            <MdDeleteSweep className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete'/>
            <BsCheckLg className='icon' onClick={()=>handlecomplete(index)} title='Completed'/>
          </div>
          </div>
              )
            })
          }
         {isCompleteScreen === true && (
  <div>
    <h3>After deleting, please refresh the page to get the updated list</h3>
  </div>
)}

          {isCompleteScreen===true && completedTodos.map((item,index)=>{
                        return(
                          <div>
                    {/* <h3>After deleting please refreash the page to get updated list</h3> */}
                     
                          <div className="todolist-item" key={index}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p> 
                      <p><small>Completed on: {item.completedon}</small></p>
                    <div>
                      <MdDeleteSweep className='icon' onClick={()=>handlecompletedDeleteTodo(index)} title='Delete'/> 
                      {/* <BsCheckLg className='icon' onClick={()=>handlecomplete(index)} title='Completed'/> */}
                     
                    </div>
                    </div>
                    </div>
                        )
                      })
                     
                    }
        </div>
        </div>
    </div>
  );
}

export default App;
