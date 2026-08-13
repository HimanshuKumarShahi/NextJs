type User={
  id:number;
  name:string;
  username:string;
}

export default async function PythonPage(){

  const response = await fetch("https://jsonplaceholder.typicode.com/users")

  const users = await response.json();

  return(
    <>
    <main>
      <h1>Users Data: </h1>
      <p className="p-5 bg-orange-100 text-black w-auto">User Data for trial</p>
    
      <ul>
        {users.map((user:User)=>(
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
    </>
  )
}