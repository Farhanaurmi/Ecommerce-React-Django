import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Form,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { listProductDetails,updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

function ProductEditScreen({ history,match }) {
    
    const productId = match.params.id

    const [name,setName]= useState('')
    const [brand,setBrand]= useState('')
    const [price,setPrice]= useState(0)
    const [photo,setPhoto]= useState('')
    const [category,setCategory]= useState('')
    const [countInStock,setCountInStock]= useState(0)
    const [description,setDescription]= useState('')
    const [uploading,setUploading]= useState(false)      



    const dispatch= useDispatch()

    const productDetails=useSelector(state=>state.productDetails)
    const { error, loading, product }=productDetails

    const productUpdate=useSelector(state=>state.productUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate }=productUpdate
   

    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number(productId) ){
                dispatch(listProductDetails(productId))
    
            }else{
                setName(product.name)
                setBrand(product.brand)
                setPrice(product.price)
                setPhoto(product.photo)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
      
        }

    }, [product,productId,history,dispatch,successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateProduct({_id:productId, name, brand, price, photo, category, countInStock, description }))

    }

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)
        try{
            const config ={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/products/update', formData, config)
            setPhoto(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }

    }
    return (
        <div>
            <Link to='admin/productlist'> Go Back
            </Link>
            <FormContainer>
            <h1>Edit Product</h1>
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loadingUpdate && <Loader />}
            {loading ? (<Loader/>)
            : error ? ( <Message variant='danger'>{error}</Message>)
            :(
            <Form onSubmit={ submitHandler }>
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

                <Form.Group controlId='brand'>
                    <Form.Label>brand</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Brand'
                    value={brand}
                    onChange={(e)=>setBrand(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='photo'>
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Photo'
                    value={photo}
                    onChange={(e)=>setPhoto(e.target.value)}
                    >
                    </Form.Control>
                    <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                    >

                    </Form.File>
                    {uploading && <Loader/>}
                </Form.Group>

                <Form.Group controlId='Price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='Category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='Description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>CountInStock</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter CountInStock'
                    value={countInStock}
                    onChange={(e)=>setCountInStock(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            )}
            </FormContainer>
            
        </div>
    )
}


export default ProductEditScreen
