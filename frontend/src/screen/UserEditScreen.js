import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import FormContainer from '../components/FormContainer'

function UserEditScreen({ history,match }) {
    
    const userId = match.params.id

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [isAdmin,setIsAdmin]= useState('')



    const dispatch= useDispatch()

    const userDetails=useSelector(state=>state.userDetails)
    const { error, loading, user }=userDetails
   

    useEffect(() => {
        if(!user.name || user._id !== Number(userId) ){
            dispatch(getUserDetails(userId))

        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
  
    }, [user,userId])

    const submitHandler=(e)=>{
        e.preventDefault()


    }
    return (
        <div>
            <Link to='admin/userlist'> Go Back
            </Link>
            <FormContainer>
            <h1>Edit User</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='admin'>
                    <Form.Check
                    type='checkbox'
                    Label='Is Admin'
                    checked={isAdmin}
                    onChange={(e)=>setIsAdmin(e.target.checked)}
                    >
                    </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            </FormContainer>
            
        </div>
    )
}


export default UserEditScreen
