export const addUser  = async (name)=>{
  try {
    const responseData = await fetch (`https://playground.4geeks.com/todo/users/${name}`, {
        method: "POST",
        headers:{
            "content-type":"aplicacion/json"
        },

    })
    const json = await responseData.json();
    return json
  }
  catch (error) {
    console.error(`Oye la cagaste: ${error}`)
  }
}

export const getUsers = async ()=>{
    try {
    const responseData = await fetch (`https://playground.4geeks.com/todo/users/`);
    const json = await responseData.json();
    return json.users
  }
  catch (error) {
    console.error(`Oye la cagaste: ${error}`)
  }

}

export const deleteUser = async (name)=>{
  try{
      const responseData = fetch(`https://playground.4geeks.com/todo/users/${name}`,
        {method: "DELETE"}
      ) 
      console.log("hatsa ac'asi que llega")
  }
  catch (error){
      console.error(`brother la cagaste, ${error}`)
  }
}