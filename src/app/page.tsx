"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

interface LocationDataType
{
  result:string[]
}

interface RestaurantType
{
  _id?: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  restaurantName: string,
  city: string,
  mobile: string,
  address: string,
  __v?: string
}

interface LocationRestaurantType 
{
  location?: string,
  restaurant?: string
}

export default function Home() {
  const [location, setLocation] = useState<LocationDataType[]>([])
  const [selectedLocation, setSelectedLocation] = useState<String>('')
  const [showLocation, setShowLocation] = useState<boolean>(false)
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([])
  const router = useRouter()

  useEffect(()=>{
    loadLocations()
    loadRestaurant()
  },[])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations")
    response = await response.json()
    if(response.success)
    {
      setLocation(response.result)
    }
  }

  const loadRestaurant = async (params?:LocationRestaurantType) => {
    console.log(params)
    let url = "http://localhost:3000/api/customer"
    if(params?.location)
    {
      url = url+"?location="+params.location
    }
    else if(params?.restaurant)
    {
      url = url+"?restaurant="+params.restaurant
    }

    let response = await fetch(url)
    response = await response.json()
    if(response.success)
    {
      setRestaurant(response.result)
    }
  }

  const handleLocation = (city:string) => {
    setSelectedLocation(city)
    setShowLocation(false)
    loadRestaurant({location:city})
  }

  return (
    <main>
      <CustomerHeader/>
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input type="text" value={selectedLocation} onClick={()=> setShowLocation(true)} className="select-input" placeholder="Select Place"/>
          <ul className="location-list">
            {
             showLocation && location.map((city) => (
                <li onClick={()=>handleLocation(city)}>{city}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input" onChange={(e) => loadRestaurant({restaurant:e.target.value})} placeholder="Enter Food Or Restaurant Name"/>
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurant.map((item:RestaurantType, key) => (
            <div className="restaurant-wrapper" key={key} onClick={(e) => router.push(`explore/${item.restaurantName}`)}>
              <div className="heading-wrapper">
                <h3>{item.restaurantName}</h3>
                <h5>{item.email}</h5>
              </div>
              <div className="address-wrapper">
                <div><b>City : </b>{item.city}, </div>
                <div className="address"><b> Address : </b> {item.address}, <b> Email :</b> {item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      
      <Footer/>
    </main>
  );
}
