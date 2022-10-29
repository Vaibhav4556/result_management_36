import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function DefaultLayout(props) {

  const navigate = useNavigate()

    const { employee } = useSelector((state) => state.employee);
    console.log(employee)
  return (
    <div className='layout'>
        <div className='header d-flex justify-content-between'>
         <h1 className='secondary-text'>UNIVERSITY <span className='text-white'>RESULT</span> </h1>
         <div style={{display:"flex",alignItems:"center",flexDirection:"column" , marging:"2px"}}>
         <h5 className='text-white '>{employee?.name}</h5>
         <h6 className='text-white cursor-pointer'onClick={()=>{
         localStorage.removeItem("token")
         navigate("/login")
         }
        }>Logout</h6>
         
         </div>
        
        </div>
        <div className='content'>
            {props.children}
             </div>


    </div>
  )
}
