import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { ShowLoading, HideLoading } from "../redux/alerts";

function Results() {
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
        dispatch(HideLoading());
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
        getResults();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const columns = [
    {
      title: "Examination",
      dataIndex: "examination",
      key: "examination",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
              navigate(`/employee/results/edit/${record._id}`);
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
      <PageTitle title="Results" />

      <div style={{ width: "300px" }}>
        <input type="text" placeholder="search student" />

        <button
          className="primary text-white px-3 my-1"
          onClick={() => {
            navigate("/employee/results/add");
          }}
        >
          Add Result
        </button>
      </div>

      <Table columns={columns} dataSource={results} />
    </div>
  );
}

export default Results;
