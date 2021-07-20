import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Button,Table,Row,Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts,deleteProduct,createProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

function ProductListScreen({history,match}) {
    const dispatch= useDispatch()
    const productList =useSelector(state=>state.productList)
    const { error,loading,products,page,pages }=productList

    const productDelete =useSelector(state=>state.productDelete)
    const { error:errorDelete,loading:loadingDelete,success:successDelete }=productDelete

    const productCreate =useSelector(state=>state.productCreate)
    const { error:errorCreate,loading:loadingCreate,success:successCreate,product:createdProduct }=productCreate

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    let keyword = history.location.search
   
    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')}
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }

    }, [dispatch,history,userInfo,successDelete,successCreate,createdProduct,keyword])

    const deleteHandler=(id)=>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
        
    }

    const CreateProductHandler=()=>{
        dispatch(createProduct())
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
                {loadingCreate && <Loader/>}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
             
                {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : ( <div>
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
                <Paginate page={page} pages={pages} isAdmin={true}/>
                </div>
                )}
        </div>
    )
}

export default ProductListScreen