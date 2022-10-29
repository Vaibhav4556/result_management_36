import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading , HideLoading} from "../redux/alerts";
import toast from "react-hot-toast";




export default function Register() {

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/employee/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 p-4 white" onFinish={onFinish}>
        <h1 className="text-medium"> Employee Registration </h1>
        <hr />
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="employeeId" label="Employee Id">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="confirm password" label="Confirm Password">
          <Input type="password"/>
        </Form.Item>
        <button className="primary text-white px-4 my-3 w-100">
          Click here to Register
        </button>
        <Link to="/login"> Already Registered, Click here to Login</Link>
      </Form>
    </div>
  );
}
