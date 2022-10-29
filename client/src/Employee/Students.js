import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { ShowLoading, HideLoading } from "../redux/alerts";

function Students() {
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // delete student

  const deleteStudent = async (rollNo) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${rollNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const columns = [
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone no",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "0px",
          }}
        >
          <i
            className="ri-pencil-fill  "
            onClick={() => {
              navigate(`/employee/students/edit/${record.rollNo}`);
            }}
          ></i>
          <i className="ri-delete-bin-fill" onClick={()=>deleteStudent(record.rollNo)}></i>
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Students" />

      <div style={{ width: "300px" }}>
        <input type="text" placeholder="search student" />

        <button
          className="primary text-white px-3 my-1"
          onClick={() => {
            navigate("/employee/students/add");
          }}
        >
          Add Student
        </button>
      </div>

      <Table columns={columns} dataSource={students} />
    </div>
  );
}

export default Students;
