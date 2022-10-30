import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import './App.css';

function App() {
  const [users, setUsers] =useState([]);
  useEffect( ()=>{
    fetch('http://localhost:5000/users')
        .then(res=> res.json())
        .then(data => setUsers(data))
  },[])


  const handleSubmit = event =>{
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const password = form.email.value;
    const user = {name, password};
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data =>console.log(data))
    .catch(err => console.error(err))
    form.reset()
  }
  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name='name' style={{margin: "8px", padding:'5px'}} placeholder='name' />
        <br />
        <input type="email" name='email' style={{margin: "8px", padding:'5px'}} placeholder='email' />
        <br />
        <input type="submit" style={{margin: "8px", padding:'5px'}} value="submit" />
      </form>
     {
      users.map(user => <p key={user.id}>{user.name}  {user.email}</p>)
     }
    </div>
  );
}

export default App;
