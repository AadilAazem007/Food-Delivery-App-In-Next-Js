"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

interface LocationDataType
{
  result:string[]
}


export default function Home() {
  const [location, setLocation] = useState<LocationDataType[]>([])
  const [selectedLocation, setSelectedLocation] = useState<String>('')
  const [showLocation, setShowLocation] = useState<boolean>(false)

  useEffect(()=>{
    loadLocations()
  },[])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations")
    response = await response.json()
    if(response.success)
    {
      setLocation(response.result)
    }
  }

  const handleLocation = (city:string) => {
    setSelectedLocation(city)
    setShowLocation(false)
  }


console.log(location)
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
          <input type="text" className="search-input" placeholder="Enter Food Or Restaurant Name"/>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
