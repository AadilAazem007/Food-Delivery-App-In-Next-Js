import { useState } from "react"

interface FoodDataType {
    name: string,
    price: string,
    path: string,
    description: string,
    resto_id?:string
}

const initianFoodData:FoodDataType = {
    name: "",
    price: "",
    path: "",
    description: ""
}

interface RestroDataType {
    email:string,
    restaurantName:string,
    city: string,
    mobile: string,
    address: string,
    _v?: number,
    _id?:string,
}

const AddFoodItems = () => {
    const [foodData, setFoodData] = useState<FoodDataType>(initianFoodData)
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    
    const handleSubmit = async (e:SubmitEvent): Promise<void>  => {
        e.preventDefault()

        if(!foodData.name || !foodData.price || !foodData.path || !foodData.description)
        {
            setError(true)
            return
        }
        else
        {
            setError(false)
        }

        let restro_id
        const restroData:RestroDataType = JSON.parse(localStorage.getItem("restaurentUser"))
        if(restroData)
        {
            restro_id = restroData._id
        }
        const result = await fetch("http://localhost:3000/api/foodAPI", {
            method: "POST",
            body: JSON.stringify({...foodData,restro_id})
        })
        const response = await result.json()
        if(response.success)
        {
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            }, 4000)
        }
    }

    return (
        <>
            <h2>Add Food Items</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Food Name" name="name" value={foodData.name} onChange={(e) => setFoodData((preVal) => ({ ...preVal,[e.target.name]:e.target.value }))}/>
                    </div>
                    {
                        error && !foodData.name && <span className="input-error">Please Enter Name</span>
                    }

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Price" name="price" value={foodData.price} onChange={(e) => setFoodData((preVal) => ({ ...preVal,[e.target.name]:e.target.value }))}/>
                    </div>
                    {
                        error && !foodData.price && <span className="input-error">Please Enter Price</span>
                    }

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Path" name="path" value={foodData.path} onChange={(e) => setFoodData((preVal) => ({ ...preVal,[e.target.name]:e.target.value }))}/>
                    </div>
                    {
                        error && !foodData.path && <span className="input-error">Please Enter Path</span>
                    }

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Description" name="description" value={foodData.description} onChange={(e) => setFoodData((preVal) => ({ ...preVal,[e.target.name]:e.target.value }))}/>
                    </div>
                    {
                        error && !foodData.description && <span className="input-error">Please Enter Description</span>
                    }

                    <div className="input-wrapper">
                        <button className="button">Save</button>
                    </div>
                </form>
                {
                    success && <span className="input-success">Food Data insert successfully</span>
                }
            </div>
        </>
    )
}

export default AddFoodItems