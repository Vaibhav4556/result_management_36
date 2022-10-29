import React from "react";

export default function Spinner() {
  return (
    <div className="spinner-parent">
    <div className="spinner">
    <lottie-player
        src="https://assets10.lottiefiles.com/datafiles/arIrMB5WY4Uhhgv0OuShBLzoAt9AnrzQCh9Z5wjW/spinner loading/data.json"
        background="transparent"
        speed="1"
       
        loop
   
        autoplay
      ></lottie-player>
    </div>
    </div>
  );
}
