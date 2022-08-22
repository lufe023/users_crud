import { useEffect, useState } from 'react'
import './App.css'
import './Form.css'
import axios from 'axios'
import Users from './components/UsersList'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen ] = useState(false)
  const [deleteOpen, setDeleteOpen ] = useState(false)

  const URL = 'https://users-crud1.herokuapp.com/users/'

  const getAllusers =()=>{
    
    axios.get(URL)
  .then(res => {setUsers(res.data)
  })
  .catch(err => console.log(err)) 
  }
  
  useEffect(() => {
    getAllusers()
  
  }, [])

  const handleOpenDelete = () => setDeleteOpen(true)  
  const handleCloseDelete = () => setDeleteOpen(false)  

const handleOpenForm = () => setIsFormOpen(true)
const handleCloseForm = () => setIsFormOpen(false)

  return (
    <div className="App">
      

      <h1 className='AppTitle'>Users</h1>
      <button className='createUserButton' onClick={handleOpenForm}>
      <i className="fa-solid fa-user-plus"></i> Create New User
      </button>
      <UsersForm  getAllusers = {getAllusers}
      updateInfo = {updateInfo}
      setUpdateInfo = {setUpdateInfo}
      isFormOpen = {isFormOpen}
      handleCloseForm = {handleCloseForm}/> 
      <section className='usersContainer'>
      {
        users?.map(user=>(
          <UsersList
          deleteOpen = {deleteOpen}
          handleCloseDelete = {handleCloseDelete}
          handleOpenDelete = {handleOpenDelete}

          updateInfo = {updateInfo}
          setUpdateInfo = {setUpdateInfo}
          key = {user.id}
          user = {user}
          getAllusers = {getAllusers}
          handleOpenForm = {handleOpenForm}
          />
        ))
      }
      </section>
    </div>
  )
}

export default App
