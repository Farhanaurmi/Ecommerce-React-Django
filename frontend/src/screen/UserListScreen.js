import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Button,Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers,userDelete } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function UserListScreen({history}) {
    const dispatch= useDispatch()
    const listUser=useSelector(state=>state.listUser)
    const { error,loading,users }=listUser

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const deleteUser=useSelector(state=>state.deleteUser)
    const { success }=deleteUser

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    }, [dispatch,history,success])

    const deleteHandler=(id)=>{
        if(window.confirm('are you sure?')){
            dispatch(userDelete(id))
        }
    }

    return (
        <div>
             <h1>Users</h1>
                {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user =>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: 'green'}}></i>
                                ):(<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className='btn-sm' variant='primary'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' variant='secondary' onClick={()=>{deleteHandler(user._id)}}><i className='fas fa-trash'></i></Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
        </div>
    )
}

export default UserListScreen
