import { useState } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Card from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import AuthContextProvider from './components/Context/AuthContextProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetials from './components/ProductDetials/ProductDetials'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import Categories from './components/Categories/Categories'
import WishList from './components/WishList/WishList'
let client = new QueryClient()

const router = createBrowserRouter([{
  path:"" , element: <Layout/>,children:[{
    path:"" ,element: <Register/>
  },
 {
    path:"Register" ,element: <Register/>
  },
 {
    path:"ForgetPassword" ,element: <ForgetPassword/>
  },
 {
    path:"VerifyCode" ,element: <VerifyCode/>
  },
  {
    path:"home" ,element: <ProtectedRoute><Home/></ProtectedRoute>
  },
  {
    path:"Cart" ,element: <ProtectedRoute><Card/></ProtectedRoute> 
  },
  {
    path:"WishList" ,element: <ProtectedRoute><WishList/></ProtectedRoute> 
  },
  {
    path:"Categories" ,element: <ProtectedRoute><Categories/></ProtectedRoute> 
  },
  {
    path:"Brands" ,element: <ProtectedRoute><Brands/></ProtectedRoute> 
  },
  {
    path:"Payment" ,element: <ProtectedRoute><Payment/></ProtectedRoute> 
  },
  {
    path:"AllOrders" ,element: <ProtectedRoute><AllOrders/></ProtectedRoute> 
  },
  {
    path:"Products" ,element: <ProtectedRoute><Products/></ProtectedRoute> 
  },
  {
    path:"ProductDetials/:id/:category" ,element: <ProtectedRoute><ProductDetials/></ProtectedRoute> 
  },
  {
    path:"Login" ,element: <Login/> 
  },
]
}])





function App() {
  // const [count, setCount] = useState(0)

  return (
   <QueryClientProvider client={client}>
    <ReactQueryDevtools></ReactQueryDevtools>
     <AuthContextProvider>
      <Toaster/>
  
  <RouterProvider router={router}/>

</AuthContextProvider>
   </QueryClientProvider>
  )
}

export default App

