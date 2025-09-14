import React, {useState, useEffect} from 'react'
import { addUser, getUsers, deleteUser } from '../services/user.service'
import { getTasks, addTask, deleteTask } from '../services/todo.service'

export default function Tareas (){
    const [user, setUser] = useState("");
    const [tarea, setTarea] = useState("");
    const [update, setUpdate] = useState(1);
    const [taskList, setTaskList] = useState([]);
    const [userList, setUserList] = useState([]);

    const updateUserList = async ()=>{
        const data = await getUsers();
        setUserList(data);
    }

    const updateData = async ()=>{
        //Llamar a la API con todo.service
        const data = await getTasks(user)
        //Meto el array de elementos que me trae en taskList
        setTaskList(data)
    }

    useEffect(()=>{
        //mi window.onload
        if(user!==""){
        updateData();
        console.log("window.onload")}
    },[update])

    const handleAddUser = async (e)=>{
        if(e.key==="Enter"){
            const user_name = e.target.value;
            updateUserList();
            let existe = false;
            for(let t = 0; t<userList.length;t++){
                if(userList[t].name===user_name)
                    existe = true;
            }
            if(existe===false){
                const add = await addUser(user_name);
                setUser(user_name);
            }
            else{
                setUser(user_name);
            }
            setTarea("")
        }
        setUpdate(update+1)
        //recargo manualmente la lista de usuarios para que si o si, se renderice el componente por el cambio en usuarios
        const add = await userList()
    }

    const handleAddTask = async (e)=>{
        if(e.key==="Enter"){
            if(user==="")
                handleAddUser(e);
            else{
            const task = (
                {
                label: tarea,
                is_done: false
                }
             )
            const add = await addTask(user,task)
            setTarea("")
            setUpdate(update+1)
            //recargo manualmente la lista de tareas, para que si o si se reinicie
            const data = await updateData()}
        }
    }

    const handleChange = (e)=>{
        setTarea(e.target.value);
        setUpdate(update+1)
    }

    const handleDelete = async (e)=>{
        const erase = await deleteTask(e.target.parentNode.id);
        setUpdate(prev => prev+1);
    }

    const handleDeleteUser = async ()=>{
        const erase = await deleteUser(user);
        setUser("");
        setTaskList([]);
        setUpdate(update+1);
    }

    const mensaje = ()=>{
        if(user==="")
            return ("inicie sesión con su usuario")
        else
            return ("añada tareas")
    }

    const inicio = ()=>{
        if(user==="")
            return "";
        else
            return (<h1> de {user}</h1>)
    }

    const deletingAll = async ()=>{
        for(let t = 0;t<taskList.length;t++){
            const erase = await deleteTask(taskList[t].id);
        }
        setUpdate(update+1);   
    }

    return (
    <div className="text-center">
        <h1 className="px-3">ToDoList con fetch </h1>{inicio()}
        <div>
                <div className="card">
                    <input
                        className="p-2 m-3"
                        value={tarea}
                        placeholder={mensaje()}
                        onKeyDown={handleAddTask}
                        onChange={handleChange}
                    />
                
                {taskList.length===0 ? <></>:<ul className="list-group list-group-flush">
                {taskList.map(element=>{
                    return(
                    <li className="list-group-item" key={element.id} id={element.id}>{element.label}
                        <button className="btn btn-danger btn-close float-end" onClick={handleDelete}/>
                    </li>
                )})}
                    <p className="text-start px-3 mt-2">{taskList.length} tasks left</p>
                </ul>
                }
                </div>
            <button className="btn btn-primary m-3" onClick={deletingAll}>clear</button>
            <button className="btn btn-danger m-3" onClick={handleDeleteUser}>delete user</button>
        </div>
    </div>
)}