import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const handleDelete = (e, id) => {
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()
  }
  

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto bg-violet-100 rounded-xl m-4 min-h-[70vh] p-5 md:w-1/2">
      <h1 className='font-bold text-xl text-center'>iTask - Manage your todos at one place</h1>
        <div className='add my-5 flex flex-col gap-2'>
          <h2 className='text-lg font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} className='bg-white w-full py-1 px-5 border rounded-md' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-900 hover:bg-violet-950 disabled:bg-violet-700 rounded-md p-2 py-1 text-white font-bold cursor-pointer'>Save</button>
        </div>
        <input className='my-4' onChange={togglefinished} type="checkbox" checked={showfinished} id="" /> Show finished
        <h2 className='font-bold text-lg'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='flex justify-center'>No todo to display</div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between m-1">
             <div className='flex gap-5 items-center'>
               <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
             </div>
              <div className="button">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-900 hover:bg-violet-950 rounded-md p-2 py-1 text-white font-bold mx-1 cursor-pointer'><FaEdit /></button>
                <button onClick={(e)=>handleDelete(e, item.id)} className='bg-violet-900 hover:bg-violet-950 rounded-md p-2 py-1 text-white font-bold mx-1 cursor-pointer'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
