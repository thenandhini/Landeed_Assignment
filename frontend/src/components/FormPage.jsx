



import React from "react";

//receiving curr page, next page and submit as props

//page contains page_num and questions

//adding isLastPage in props 

const FormPage = ({ page, onNext,isLastPage, onSubmit }) => {

    //state to store and track change of data fields
    const [data, setData] = useState({});

    const handleChange= (Key,value)=>{
        setData({...data,[key]:value}); //add the data in key value pairs along with existing data

    };

    const handleNext=()=>{
        //if last page then submit else  pass the data to OnNext
        if(isLastPage)
        {
            onSubmit(data);
        }
        else
        onNext(data); //if next is clicked send the data to onNext


    };


    return (
        //selecting each question from questions using map
        <div>
            <h2>{page.page_num}</h2>

            {page.questions.map((question, index) => {
                //each question  has label and type . type is either select or text or number. select type has options
                <div key={index}>
                    <label>{question.label}</label>
                    {question.type === "select" ? (
                        <select onChange={(e) => handleChange(question.key, e.target.value)}>

                            {question.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>

                            )

                            )}

                            {/* <option value ="option1">A</option>
                            <option value="option 2">B</option> */}



                        </select>

                    ) : ( //input=> number or text . number for age and text for name
                        <input type={question.type} 

                        //if type is number i.e for age, set min value to be zero
                        min={question.key==="age"?0:undefined}
                        value={question.key} //***** */
                        onChange={(e)=>handleChange(question.key,e.target.value)}
                        
                        />
                    )}



                </div>

            }


            )}
        <button onClick={handleNext}>Next</button>

        </div>
    );
};



export default FormPage
