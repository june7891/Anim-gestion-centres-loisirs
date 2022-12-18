
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";




const ChecklistItem = ({setActiveItemsCount, participant}) => {
    const [isActive, setIsActive] = useState(false);
    const [checked, setChecked ] = useLocalStorage("checked", false);
    
  


    const changeHandler = (e) => {
      // setIsActive(!isActive);
      
      setChecked(!checked);   
        localStorage.setItem(e.target.id, JSON.stringify(e.target.checked))
      
    };

    


    useEffect((e) => {

     

      if (!checked) {
        setActiveItemsCount((prevCount) => {
          if (prevCount !== 0) {
            return prevCount - 1;
          }
  
          return prevCount;
        });
      }
  
      if (checked) {
        setActiveItemsCount((prevCount) => prevCount+1);
      }

    }, [checked, setActiveItemsCount]);
  


    return <input type="checkbox" id={participant} checked={checked} onChange={changeHandler} />;
  };

  export default ChecklistItem;