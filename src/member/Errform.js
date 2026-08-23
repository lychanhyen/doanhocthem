import React from "react";
 function Errform({errs={}}){
  if(Object.keys(errs).length>0){
    return Object.keys(errs).map((key,index)=>{
      return(
        <li key={index}>{errs[key]}</li>
      )
    })
  }
 }
 export default Errform;