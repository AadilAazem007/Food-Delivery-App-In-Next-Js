'use client'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import '../restaurant/style.css'

interface UserDataType {
    email:string,
    restaurantName:string,
    city: string,
    mobile: string,
    address: string,
    __v?:number,
    _id?:string
}

const RestaurantHeader = () => {
    const [details, setDetails] = useState<UserDataType>()
    const router = useRouter()

    useEffect(() => {
        let data = localStorage.getItem("restaurentUser")
        if(!data)
        {
            router.push('/restaurant')
        }
        else{
            setDetails(JSON.parse(data))
        }
    },[])

    return (
        <div className='header-wrapper'>
            <div className="logo">
                <img style={{width:100}} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="test"/>
                {details?.restaurantName}
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details.restaurantName ? 
                    <li>
                        <Link href="/">Profile</Link>
                        <Link href="/">Logout</Link>
                    </li>
                    :
                    <li>
                        <Link href="/">Login/SignUp</Link>
                    </li>
                }
            </ul>
        </div>
    )
}

export default RestaurantHeader