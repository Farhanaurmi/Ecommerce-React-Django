import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Button,Table,Row,Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts,deleteProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProductListScreen({history,match}) {
    const dispatch= useDispatch()
    const productList =useSelector(state=>state.productList)
    const { error,loading,products }=productList

    const productDelete =useSelector(state=>state.productDelete)
    const { error:errorDelete,loading:loadingDelete,success:successDelete }=productDelete

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

   
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            history.push('/login')
        }
    }, [dispatch,history,userInfo,successDelete])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
        
    }

    const CreateProductHandler=()=>{
        //yhfgsxafh
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col><h1>Users</h1>
                </Col>
                <Col className='text-right'>
                <Button className='my-3' onClick={CreateProductHandler}><i className='fas fa-plus'></i>Create Product</Button>
                </Col>
            </Row>

                {loadingDelete && <Loader/>}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
             
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
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product =>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm' variant='primary'><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' variant='secondary' onClick={()=>{deleteHandler(product._id)}}><i className='fas fa-trash'></i></Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
        </div>
    )
}

export default ProductListScreen
