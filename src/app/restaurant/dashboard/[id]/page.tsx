"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


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

const EditFoodItems = (props:any) => {
    const router = useRouter()
    const [foodData, setFoodData] = useState<FoodDataType>(initianFoodData)
    const [error, setError] = useState<boolean>(false)
    const [successItem, setSuccessItem] = useState<boolean>(false)
    
    useEffect(() => {
        handleLoadFoodItem()
    }, [])
    
    const handleLoadFoodItem = async () => {
        let response = await fetch(`http://localhost:3000/api/foodAPI/edit/${props.params.id}`)
        let result = await response.json()
        if(result.success)
        {
            const { name, price, path, description } = result.result[0];
            setFoodData({
                name: name,
                price: price,
                path: path,
                description: description
            });
        }
    }

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
            let result = await fetch(`http://localhost:3000/api/foodAPI/edit/${props.params.id}`,{
                method: "PUT",
                body: JSON.stringify(foodData)
            })

            let response = await result.json()
            console.log(response)
            if(response.success)
            {
                setSuccessItem(true)
                setTimeout(() => {
                    setSuccessItem(false)   
                    router.push(`dashboard`) 
                }, 4000)
            }
        }
    }

    return (
        <>
            <h2>Update Food Items</h2>
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
                    <div className="input-wrapper">
                        <button className="button" onClick={()=>router.push('../dashboard')}>Back To Dashboard</button>
                    </div>
                </form>
                    {
                        successItem && <span className="input-success">Food Item update successfully</span>
                    }
            </div>
        </>
    )
}

export default EditFoodItems