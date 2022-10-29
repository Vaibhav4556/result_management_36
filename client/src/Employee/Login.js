import { Form ,Input} from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from "react-redux";
import { HideLoading , ShowLoading} from '../redux/alerts';
import toast from "react-hot-toast";


export default function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()

    const onFinish= async(values)=>{
     
      try {
        dispatch(ShowLoading());
        const response = await axios.post("/api/employee/login", values);
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token" ,response.data.data)
          navigate("/employee")
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error(error.message);
      }
    
       }
  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
    <Form layout="vertical w-400 p-4 white" onFinish={onFinish} >
      <h1 className="text-medium"> Employee Login </h1>
      <hr />
      <Form.Item name="employeeId" label="Employee Id" >
        <Input />
      </Form.Item >
      <Form.Item  name="password" label="Password">
        <Input  type="password"/>
      </Form.Item>
      <button className="primary text-white px-4 my-3 w-100">Click here to login</button>
      <Link to='/register'>Not found, Click here to Register</Link>
    </Form>
  </div>
  )
}
