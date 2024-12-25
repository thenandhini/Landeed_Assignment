


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


    //fetch  fields from backend dynamically

    useEffect(()=>{
        axios.get("http://localhost:2024/config")
        .then((response)=>{
            setConfig(response.data);
            console.log("Fetched configuration yayyy!",response.data);

        })
        .catch((error)=>{
            console.error("Error fetching config",error);
        })

    },[])

    const handleNextPage=(data)=>{
        setCurrPage((page)=>page+1);

    };

    const handleSubmit=(data)=>{
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