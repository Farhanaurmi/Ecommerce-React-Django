import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    if(! shippingAddress ){
        history.push('/shipping')
    }

    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                    <Form.Check
                    type='radio'
                    label='Paypal or Credit Card'
                    id='paypal'
                    name='paymentmethod'
                    checked
                    onChange={(e)=>paymentMethod(e.target.value)}
                    >

                    </Form.Check>
                    </Col>
            </Form.Group>

            <Button 
                    type='submit'
                    variant='primary'
                > 
                    Continue
                </Button>

            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen
