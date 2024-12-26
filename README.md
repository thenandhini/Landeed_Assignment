# Landeed Assignement

![diagram.png](./diagram.png)
### Get Started

- Step 1: Open the terminal window and clone the repo
    ``` bash
    git clone https://github.com/thenandhini/Landeed_Assignment.git
    ```

- Step 2: install the dependencies and Run the Backend.
    ``` bash
    cd Landeed_Assignment/backend/
    npm i
    node index.js
    ```

- Step 3: Open a new terminal window, install the dependencies and Run the Frontend.
    ``` bash
    cd Landeed_Assignment/frontend/
    npm i
    npm run dev
    ```

### Backend API Endpoint Docs

##### 1. GET `/config` endpoint :
Returns the Form Questions, Types of Responses, Timeout, etc. as per requirements, providing the dynamic parameters to frontend to render the dynamic form

``` json
{
    "timeout": 18000,
    "pages": [
        {
            "page_num": "Page 1",
            "questions": [
                {
                    "key": "name",
                    "label": "Name",
                    "type": "text",
                    "required": true
                },
                ...	
            ]
        },
        ...
    ]
}
```

##### 2. POST `/submit` endpoint :
Allows form data submission.
``` json
{
    "name": "Nandhini R",
    "gender": "F",
    "age": 23,
    "profession": "Owner",
    "services": "Building amazing websites"
}
```
