


import React, { useEffect, useState } from "react";
import FormPage from "./FormPage.jsx"
import { use } from "react";
import axios from "axios";

//each page needs to keeps an eye of the curr page 

const MultiPageForm=()=>{
    //backend sends the config file.step 1:store it


    const [config,setConfig]=useState(null);
    const [currPage,setCurrPage]=useState(0); 

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
        axios.post("http://localhost:2024/submit",{...formData,...data}) //merge formData with data from prev page

        .then(()=>{
            alert("Yayyy! Form submitted successfully!");

        })
        .catch((error)=>{
            console.error("error during submission ",error);
            alert("Submission failed!");

        })


    };

    //config -> pages ->page1,page2.....

    return(
        <div>
            <FormPage

                page={config.pages[currPage]}   //current page
                Next={handleNextPage}
                onSubmit={handleSubmit}
                
            />
        </div>

    );




};

export default MultiPageForm