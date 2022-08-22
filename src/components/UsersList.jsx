
import axios from 'axios'

const UsersList = ({user, getAllusers, setUpdateInfo, handleOpenForm, deleteOpen, handleOpenDelete, handleCloseDelete}) => {

    const deleteUser = () => {
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
        axios.delete(URL)
        .then(res=>{
            console.log(res.data)
            //next to delete we call all users
            getAllusers()
            handleOpenDelete()
        })
        .catch(err => console.log(err))
    }

    const handleUpdateClick = () =>{
        setUpdateInfo(user)
        handleOpenForm()
       
    }
  return (
    <div className='Card__Users'>
        <div className={deleteOpen ? 'deleteDialog_container' : 'delete-dialog-none'}>
        <div className='dialog'>
      <i className="fa-solid fa-xmark close" onClick={handleCloseDelete}></i>
            <h2 className='userName'>Delete user</h2>
            <p className='dialo_text'>
            User Deleted
            </p>
            <button onClick={handleCloseDelete} className='createUserButton'>Aceptar</button>
        </div>
        </div>


    <h2 className='userName'>{`${user['first_name']} ${user['last_name']}`}</h2>
    <div className='hr'></div>
    <ul className='datails'>
        <li>Email <span><i className="fa-solid fa-at"></i> {user.email}</span></li>
        <li>Birthday<span><i className="fa-solid fa-gift"></i> {user.birthday}</span></li>
    </ul>
    <div className='Card__Tools'>
    <button className='btn delete' onClick={deleteUser}>
    <i className="fa-solid fa-trash-can"></i> Delete
    </button>
    <button className='btn edit' onClick={handleUpdateClick}>
    <i className="fa-solid fa-user-pen"></i> Edit
    </button>
    </div>
    </div>
)
}

export default UsersList