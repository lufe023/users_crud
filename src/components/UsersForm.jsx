import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const defaultValue ={
    first_name: '',
    last_name:'',
    email:'',
    password:'',
    birthday:''
}

const UsersForm = ({getAllusers, updateInfo, setUpdateInfo, isFormOpen, handleCloseForm}) => {

    useEffect(() => {
        if(updateInfo){
            reset(updateInfo)
        }
    }, [updateInfo])

    const createUser = data => {
        const URL = 'https://users-crud1.herokuapp.com/users/'
        axios.post(URL, data)
        .then(res=>{
            console.log(res.data)
            getAllusers()
        })
        .catch(err => console.log(err))
    }

    const updateUser = data=> {
        //updating user function 
        const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
        axios.patch(URL, data)
        .then(res=>{
            console.log(res.data)
            getAllusers()
        })
        .catch(err => console.log(err))
    }
    
    const {register, reset, handleSubmit} = useForm()

    const submit = data => {
        if(updateInfo){
            //create new user
            updateUser(data)
            setUpdateInfo()
        }else{
            //update user
            createUser(data)    
        }

        //reset value and close the form
        reset(defaultValue)
        handleCloseForm()
    }

  return (
    /*     <div className='form__container'>*/
    <div className={isFormOpen ? 'form__container' : 'form-none'}>
        
        <form onSubmit={handleSubmit(submit)} className="form">
            <i className="fa-solid fa-xmark close" onClick={handleCloseForm}></i>
            <h2>{updateInfo ? 'Update' : 'Create'} user</h2>
        
        <ul className='form__items'>
            <li>
            <label htmlFor='first_name'>First Name</label>
            <input {...register("first_name")} type='text' id='first_name'/>
            </li>

            <li>
            <label htmlFor='last_name'>Last Name</label>
            <input {...register("last_name")} type='text' id='last_name'/>
            </li>

            <li>
            <label htmlFor='email'>Email</label>
            <input {...register("email")} type='email' id='email'/>
            </li>
            
            <li>
            <label htmlFor='password'>Password</label>
            <input {...register("password")} type='password' id='password'/>
            </li>

            <li>
            <label htmlFor='birthday'>Birthday</label>
            <input {...register("birthday")} type='date' id='birthday'/>
            </li>

        </ul>
        <div className='form__footer'>
        <button className='createUserButton'>{updateInfo ? 'Update' : 'Create'} user</button>
        </div>
        </form>
    </div>
    )
}

export default UsersForm