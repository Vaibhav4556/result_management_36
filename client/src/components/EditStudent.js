import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { HideLoading, ShowLoading } from '../redux/alerts';
import PageTitle from './PageTitle';
import StudentForm from './StudentForm';


function EditStudent() {
    const [student, setStudent] = useState(null);
   
    const dispatch = useDispatch();
    const params = useParams()
    const getStudent = async (values) => {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `/api/student/get-student/${params.rollNo}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          setStudent(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    useEffect(() => {
      getStudent();
    }, []);

   
    
  return (
    <div>
        <PageTitle title="Edit Student" />
        { student && <StudentForm student={student} type="edit"/>}
    </div>
  )
}

export default EditStudent