import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducer/prouductReducers'
import { productDetailsReducer } from './reducer/prouductReducers'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer } from './reducer/orderReducers'
import { cartReducer } from './reducer/cartReducers'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,listUserReducer,deleteUserReducer,userUpdateReducer } from './reducer/userReducers'

const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, 
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    listUser: listUserReducer,
    deleteUser: deleteUserReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})
const userInfoFromStorage= localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')):null

const cartItemsFromStorage= localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')):[]

const shippingAddressFromStorage= localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState={
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage
    },
    userLogin:{userInfo:userInfoFromStorage}
}


const middleware=[thunk]


const store=createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
