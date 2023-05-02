import './style.css'
import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IconCheck } from '../../components/Icons/check';
import { IconTrash } from '../../components/Icons/trash';

export function App() {
  const notify = () => toast("Digite uma tarefa!")

  const [task, setTask] = useState('')
  const [listTasks, setListTasks] = useState([])

  const addTask = () => {
    if (!task) return notify()
    const newTask = { 
      id: Math.random(),
      task: task,
      checked: false
    }

    setListTasks([...listTasks, newTask])
    setTask("") 
  }

  const removeTask = (id) => {
    const newList = listTasks.filter(task => task.id != id)
    setListTasks(newList)
  }

  const toggleChecked = (id, checked) => {
    const index = listTasks.findIndex (task => task.id == id)
    const newList = listTasks
    newList[index].checked = !(checked)
    setListTasks ([...newList])
  }

  return (
    <>
      <div className="conteiner">
        <h1 className="title">To do list</h1>
        <div className="input">
          <input type="text" placeholder="Enter your task..." value={task} onChange={(e) => setTask(e.target.value)}/>
          <button onClick={addTask}>Add</button>
          <ToastContainer/>
        </div>

        <ul>
          {listTasks.map((task) => (
           <li className={task.checked?'checked' : 'unchecked'} checked={task.checked} key={task.id}> 
           <p>{task.task}</p>
              <div className="iconsInput">
              <button className="buttons" onClick={( () => toggleChecked(task.id, task.checked))}>
                <IconCheck color={task.checked? '#ffffff' : '#24A19C'}/>
              </button>
              <button className="buttons" onClick={() => removeTask (task.id)}>
              <IconTrash color={task.checked? '#ffffff' : '#24A19C'}/>
              </button>
            </div>
          </li> 
          ))}
        </ul>
      </div>
    </>
  )
}