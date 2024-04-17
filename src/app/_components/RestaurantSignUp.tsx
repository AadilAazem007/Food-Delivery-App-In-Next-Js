import { useState } from "react"
import { useRouter } from "next/navigation";

interface UserDataType {
    email:string,
    password: string,
    confirmPassword: string,
    restaurantName:string,
    city: string,
    mobile: string,
    address: string
}

const initialUserData: UserDataType = {
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    city: "",
    mobile: "",
    address: ""
};

const RestaurantSignUp = () => {
    const [userData, setUserData] = useState<UserDataType>(initialUserData)
    const router = useRouter()
    const [error,setError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)

    const formSubmit = async (e:SubmitEvent):  Promise<void>  => {
        if(!userData.email || !userData.restaurantName || !userData.address || !userData.city || !userData.password || !userData.confirmPassword || !userData.mobile)
        {
            setError(true)
        }
        else
        {
            setError(false)
        }

        if(userData.password !== userData.confirmPassword)
        {
            setPasswordError(true)
        }
        else
        {
            setPasswordError(false)
        }

        e.preventDefault()
        const result = await fetch("http://localhost:3000/api/restaurantSignUp",{
            method:"POST",
            body:JSON.stringify(userData)
        })
        const data = await result.json()
        if(data.success) 
        {
            const {result} = data
            delete result.password
            delete result.confirmPassword
            localStorage.setItem("restaurentUser", JSON.stringify(result))
            router.push('/restaurant/dashboard')
        }
    }

    return (
        <>
            <h3>Signup Component</h3>
            <form onSubmit={formSubmit}>
                <div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Email" name="email"  onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>
                    <p>
                        {
                            error && !userData.email && <span className="input-error">Please Enter Email</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <input type="password" className="input-field" placeholder="Enter Password" name="password" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>
                    <p>
                        {
                            error && !userData.password && <span className="input-error">Please Enter Password</span>
                        }

                        {
                            passwordError  && <span className="input-error">Password And ConfirmPassword Does Not Match</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <input type="password" className="input-field" placeholder="Enter Confirm Password" name="confirmPassword" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>
                    <p>
                        {
                            error && !userData.confirmPassword && <span className="input-error">Please Enter Confirm Password</span>
                        }

                        {
                            passwordError && <span className="input-error">Password And ConfirmPassword Does Not Match</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Restaurant Name" name="restaurantName" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>

                    <p>
                        {
                            error && !userData.restaurantName && <span className="input-error">Please Enter Restaurant Name</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter City" name="city" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>

                    <p>
                        {
                            error && !userData.city && <span className="input-error">Please Enter City</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter Mobile" name="mobile" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}/>
                    </div>

                    <p>
                        {
                            error && !userData.mobile && <span className="input-error">Please Enter Mobile</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <textarea className="textarea-field" placeholder="Enter Full Address" name="address" onChange={(e)=>setUserData((preVal) => ({ ...preVal, [e.target.name]: e.target.value }))}></textarea>
                    </div>

                    <p>
                        {
                            error && !userData.address && <span className="input-error">Please Enter Address</span>
                        }
                    </p>

                    <div className="input-wrapper">
                        <button className="button">Sign Up</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RestaurantSignUp