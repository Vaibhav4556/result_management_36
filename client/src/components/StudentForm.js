import { Row, Col, Form } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoading,HideLoading } from "../redux/alerts";

function StudentForm({student, type}) {
  const navigate = useNavigate()
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
          dispatch(ShowLoading());
          let response = null
          if (type=='edit'){
            response = await axios.post(`/api/student/update-student/${student.rollNo}`, values ,{
              headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            });

          }
          else
          {
            response = await axios.post("/api/student/add-student", values ,{
              headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            });


          }
           
          dispatch(HideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/employee/students")
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish} initialValues={student}>
        <Row gutter={[30, 30]}>
          <Col span={8}>
            <Form.Item label="First name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Roll Number" name="rollNo">
              <input type="number" disabled={type==="edit"? true : false} />
            </Form.Item> 
          </Col>
          <Col span={8}>
            <Form.Item label="Class" name="class">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Phone number" name="phoneNumber">
              <input type="number" />
            </Form.Item>
          </Col>
        </Row>
       <button className="primary mt-2" style={{width:"100px"}}><b className="text-white">SAVE</b></button>
      </Form>
    </div>
  );
}

export default StudentForm;
