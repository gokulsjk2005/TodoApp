import { useEffect, useRef, useState } from 'react'
import Todos from './Todos';

const TodoApp = () => {

    const [todos,setTodos] = useState([]);
    const [count,setCount] = useState(1);
    const inputRef = useRef(null);
    const errorRef = useRef();

    const addTodos = () => {

      if(inputRef.current.value!=""){
        setTodos([...todos,{no:count,text:inputRef.current.value,display:""}]);
        setCount(count+1);
        inputRef.current.value="";
        errorRef.current.classList.add("hidden");
      }
      else{
        errorRef.current.classList.remove('hidden');
      }
    }

    useEffect(()=>{
      setTodos(JSON.parse(localStorage.getItem("MyTodos")));
      setCount(JSON.parse(localStorage.getItem("MyTodosCount")));
    },[]);

    useEffect(()=>{
      setTimeout(() => {
        localStorage.setItem("MyTodos",JSON.stringify(todos));
        localStorage.setItem("MyTodosCount",JSON.stringify(count));
        console.log(todos);
      }, 100);
    },[todos]);

  return (

    <div className='todoApp bg-linear-to-bl from-blue-300 to-neutral-200 w-full h-dvh px-5 flex justify-center xs:items-center'>
      <div className="todoContainer pt-10 flex items-center flex-col xs:border-blue-300 xs:border xs:rounded-2xl xs:shadow-lg xs:shadow-blue-950 xs:w-[350px] xs:min-h-[400px]">
        <h1 className='text-4xl xs:text-3xl font-bold'>My Todos</h1>
        <div className="todoInput py-8 xs:py-5 relative">
          <input type="text" ref={inputRef} className='bg-blue-100 h-12 w-72 border-blue-800 border px-3 rounded-2xl relative active:outline-0 focus:outline-0' placeholder='Enter your task..'/>
          <button onClick={()=>addTodos()} className='absolute cursor-pointer bg-blue-900 h-12 text-white text-md font-medium w-18 right-0 rounded-2xl'>ADD</button>
          <p className="error text-red-700 text-md hidden" ref={errorRef}>Please enter a task</p>
        </div>
        {
          todos.sort((a,b)=>{
            if(a.display==="" && b.display==="checked") return -1;
            if(a.display==="checked" && b.display==="") return 1;
            return 0;
          }).map((todo,index)=>{
            return(
              <Todos key={index} no={todo.no} text={todo.text} display={todo.display} fn={setTodos}/>
            )
          })
        }
      </div>
    </div>

  )
}

export default TodoApp