'use client'
import { useState, useEffect } from "react"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import RestaurantHeader from "../_components/RestaurantHeader"
import RestaurantFooter from "../_components/RestaurentFooter"
import './style.css'

const Restaurant = () => {
    const [login, setLogin] = useState<boolean>(true)
    const [details, setDetails] = useState()

    useEffect(() => {
        let data = localStorage.getItem("restaurentUser")
        if(data)
        {
            setDetails(JSON.parse(data))
        }
    },[])

    const changeLoginStatus = (): void => {
        setLogin((preVal):boolean => {
            return !preVal
        })
    }

    return (
        <>
        <div className="container">
            <RestaurantHeader/>
            <h2>Restaurant</h2>
            {
                details ? "" :
                    login ? 
                    <>
                    <RestaurantLogin /> 
                    <button onClick={changeLoginStatus} className="button-link">  Don't have account</button>
                    </>
                    : 
                    <>
                    <RestaurantSignUp />
                    <button onClick={changeLoginStatus} className="button-link"> Already have an account  </button>
                    </>
            }
            
        </div>
        <RestaurantFooter/>
        </>
    )
}

export default Restaurant