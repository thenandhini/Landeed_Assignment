


import React, { useEffect, useState } from "react";
import FormPage from "./FormPage.jsx"
import axios from "axios";
import "./MultiFormPage.css";

//each page needs to keeps an eye of the curr page 

const MultiPageForm=()=>{
    //backend sends the config file.step 1:store it


    const [config,setConfig]=useState(null);
    const [currPage,setCurrPage]=useState(0); 
    //setCurrPage(0);

    //to store the form data entered by user
    const [formData,setFormData]=useState({});//empty obj default

    const [timeout,setTimeoutConfig]=useState(1800); //FOR 30 MINS
    const [isTimeOut,setIsTimeOut]=useState(false);

    //fetch  fields from backend dynamically

    useEffect(()=>{
        axios.get("http://localhost:2024/config")
        .then((response)=>{
            setConfig(response.data);
            console.log("Fetched configuration yayyy!",response.data);
            setTimeoutConfig(response.data.timeout || timeout);

        })
        .catch((error)=>{
            console.error("Error fetching config",error);
        })

    },[])

    //handling timeout 
    useEffect(() => {
   
        const timer = setTimeout(() => {
         console.log("session timed out!")//debugging
          setIsTimedOut(true);
        }, timeout * 1000);
  
        // Clear timeout if the component unmounts
        return () => clearTimeout(timer);
      
    }, [timeout]);
   




    const handleNextPage=(data)=>{
        if(isTimeOut)
        {
            alert ("Santa has left, requirement form expired !.Please refresh to call Santa over .")
            return;
        }
        setCurrPage((page)=>page+1);

    };

    const handleSubmit=(data)=>{
       
        if(isTimeOut)
        {
            alert ("Santa has left, requirement form expired !.Please refresh to call Santa over .")
            return;

        }
         //debug 
        console.log("Submitting Data:",formData);
        //submit  form Data to backend
        axios.post("http://localhost:2024/submit",
         {...formData,...data},
         {headers:{
            "Content-Type":"application/json" //ensuring content type is JSON

         }}

        ) //merge formData with data from prev page
            

        .then(()=>{
            alert("Yayyy! Form submitted successfully!");

        })
        .catch((error)=>{
            console.error("error during submission ",error);
            alert("Submission failed!");

        })


    };
    if(!config){
        return <p>loading page</p>;
    }

    //config -> pages ->page1,page2.....

    return(
        <>
                <div className="heading-container">
                    <h1>Interest Submission Form</h1>
                </div>
                <FormPage

                    page={config.pages[currPage]}   //current page
                    onNext={handleNextPage}
                    isLastPage={currPage===config.pages.length-1} //page 1 is arr[0] therefore minus 1
                    onSubmit={handleSubmit}
                    
                />
        </>

    );




};

export default MultiPageForm