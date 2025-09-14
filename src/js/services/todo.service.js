export const getTasks = async (user)=>{
    try{
        const userTasks = await fetch(`https://playground.4geeks.com/todo/users/${user}`);
        const tasks = await userTasks.json();
        return tasks.todos;
    }
    catch (err){
        console.error(`La has cagado, ${err}`);
    }
}

export const addTask = async (user, task)=>{
    console.log(task)
    let xd=` {label:"negro", is_done: false}`
    try{
        const data =  fetch(`https://playground.4geeks.com/todo/todos/${user}`,{
            method: "POST",
            body : JSON.stringify(task),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(resp =>{
            console.log(resp.ok); //llego bn la info
            console.log(resp.status); //c'odigo de recibimiento, debe ser menor a 400
            return resp.json(); //me devuelve el array
        })
        .then(data=>{
            //no se bn pa q sirve esto
            console.log(data); //imprime en la consola el objeto exacto recibido por el servidor
        })
    }
    catch (err){
        console.error(`la cagaste ${err}`)
    }
}

export const deleteTask = async (id)=>{
    try{
        const tasks = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method : "DELETE"
        })
    }
    catch(err){
        console.error(`La cagaste, ${err}`)
    }
}