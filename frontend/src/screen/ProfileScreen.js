import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,Form,Button } from 'react-bootstrap'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({history}) {

    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmpassword,setConfirmPassword]= useState('')
    const [message,setMessage]= useState('')


    const dispatch= useDispatch()
    const userDetails=useSelector(state=>state.userDetails)
    const {error,loading,user}=userDetails
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const { success }=userUpdateProfile

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success ){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))

            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
  
    }, [dispatch,history,userInfo,user,success])

    const submitHandler=(e)=>{
        e.preventDefault()
        if (password != confirmpassword){
            setMessage('Password did not match')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password,
            }))
            setMessage('')
        }

    }
    return (
        <Row>
            <Col md={3} className="justify-content-md-center text-left">
            <h1>PROFILE</h1>
            {message && <Message variant='danger'>{message}</Message>}

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


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmpassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>



                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h1>Orders</h1>
            </Col>
        </Row>
    )
}

export default ProfileScreen
