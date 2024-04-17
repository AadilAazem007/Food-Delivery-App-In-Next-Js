"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader"
import AddFoodItems from "@/app/_components/AddFoodItem"
import { useState } from "react"
import FoodItemList from "@/app/_components/FoodItemList"
const Dashboard = () => {
    const [addItem, setAddItem] = useState<boolean>(false)
    
    const handleAddFood = () => {
        setAddItem(true)
    }

    const handleDashboard = () => {
        setAddItem(false)
    }

    return (
        <div>
            <RestaurantHeader />
            <button onClick={handleAddFood}>Add Food</button>
            <button onClick={handleDashboard}>Dashboard</button>
            {
                addItem ? <AddFoodItems /> : <FoodItemList></FoodItemList>
            }
            
            
        </div>
    )
}

export default Dashboard