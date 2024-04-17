import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface FoodItemType
{
    _id?:string,
    name:string,
    price:string,
    path:string,
    description:string,
    restro_id:string,
    __v?:number
}

const foodItemVal:FoodItemType = {
    name:"",
    price:"",
    path:"",
    description:"",
    restro_id:""
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

const FoodItemList = () => {
    const router = useRouter()
    const [foodItem, setFoodItem] = useState<FoodItemType[]>([])
    useEffect(() => {
        getFoodItems()
    },[])

    const getFoodItems = async () => {
        let restro_id
        const restaurantData:RestroDataType = JSON.parse(localStorage.getItem("restaurentUser"))
        if(restaurantData)
        {
            restro_id = restaurantData._id
        }

        const foodList = await fetch(`http://localhost:3000/api/foodAPI/${restro_id}`)
        const data = await foodList.json()
        if(data.success)
        {
            //console.log(data.result)
            setFoodItem(data.result)
        }
        else
        {
            alert("Food Item not loading")
        }
    }

    const deleteItem = async (id:string) => {
        const deleteFoodItem = await fetch(`http://localhost:3000/api/foodAPI/${id}`,{
            method:"DELETE"
        })
        const response = await deleteFoodItem.json()
        if(response.success)
        {
            getFoodItems()
        }
        else
        {
            alert("Item not deleted")
        }
    }

    const editItem = async (id:string) => {
        router.push(`dashboard/${id}`)
    }

    return (
        <>
            Hello this is food item list
            <h1>Food Item</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operation</td>
                    </tr>
                </thead>
                <tbody>
                    {foodItem && foodItem.map((item,indx) => (
                        <tr key={indx}>
                            <td>{indx+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img src={item.path} /></td>
                            <td>
                                <button onClick={() => editItem(item._id)}>Edit</button> 
                                <button onClick={() => deleteItem(item._id)}>Delete</button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default FoodItemList