import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import StudentForm from "./StudentForm";

function AddStudent() {
  const navigate = useNavigate();
  return (
    <div >
      <PageTitle title="Add Students" />
      <StudentForm />

     
    </div>
  );
}

export default AddStudent;
