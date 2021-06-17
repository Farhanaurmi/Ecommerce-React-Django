import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './screen/PaymentScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <main className="text-center py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/placeorder' component={PlaceOrderScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
        </Container>
      </main>
      <Footer/>
      </Router>
  );
}

export default App;


