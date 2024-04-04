//App.jsx
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import { Store } from './components/Store/Store'
import { Premium } from './components/Premium'
import { Cart } from './components/Cart/Cart'
import { Profile } from './components/auth/Profile'
import { AddItem } from './components/EditItems/AddItem'
import { ProductDetails } from './components/Store/ProductDetails'
import { DeleteItem } from './components/EditItems/DeleteItem'
import { UpdateItem } from './components/EditItems/UpdateItem'
import { Search } from './components/Search'
import { Checkout } from './components/Cart/Checkout'
import { PaymentSuccess } from './components/Cart/PaymentSuccess'
import { MyOrders } from './components/Cart/MyOrders'
import { Footer } from './components/Footer'
import { Wishlist } from './components/Store/Wishlist'
import { Product } from './components/Store/Product'
import { useState } from 'react'

function App() {

  return <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/store' element = {<Store/>}/>
      <Route path='/item/:id' element={<ProductDetails/>} />
      <Route path='/cart/:userId' element = {<Cart/>}/>
      <Route path='/paymentsuccess' element = {<PaymentSuccess/>}/>
      <Route path='/wishlist' element = {<Wishlist/>}/>
      <Route path='/myorders/:userId' element = {<MyOrders/>}/>
      <Route path='/premium' element = {<Premium/>}/>
      <Route path='/search' element = {<Search/>}/>
      <Route path='/checkout/:userId' element = {<Checkout/>}/>
      <Route path='/addItem' element = {<AddItem/>}/>
      <Route path='/deleteItem' element = {<DeleteItem/>}/>
      <Route path='/updateItem' element = {<UpdateItem/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/user/:id' element = {<Profile/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
}

export default App
