import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({ title }) {

  const navigate = useNavigate()

    return(
     <div>
      <i className="ri-arrow-left-circle-fill" onClick={()=>navigate(-1)}></i>
      <h1 className="text-large">{title}</h1>
      <hr />
    </div>)

}

export default PageTitle;