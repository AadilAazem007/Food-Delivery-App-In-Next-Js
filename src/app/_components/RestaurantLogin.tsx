import { useState } from "react"
import { useRouter } from 'next/navigation'

interface UserDataType
{
    email: string,
    password: string
    login?: boolean
}

const initialUserData:UserDataType = {
    email: "",
    password: ""
} 

const RestaurantLogin = () => {

    const [userData, setUserData] = useState<UserDataType>(initialUserData)
    const [error, setError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    const formSubmit = async (e:SubmitEvent): Promise<boolean|void> => {
        e.preventDefault()
        if(!userData.email || !userData.password)
        {
            setError(true)
            return false;
        }
        else
        {
            setError(false)
            //userData.login = true
            try{
                let response = await fetch("http://localhost:3000/api/restaurantLogin",{
                    method:"POST",
                    body:JSON.stringify(userData)
                })
                const data = await response.json()
                if(data.success)
                {
                    const {result} = data
                    delete result.password
                    delete result.confirmPassword
                    localStorage.setItem("restaurentUser", JSON.stringify(result))
                    router.push('/restaurant/dashboard')
                }else{
                    setError(true)
                    setTimeout(()=> {
                        setError(false)
                    }, 3000)
                    return false
                }
            }
            catch(error)
            {
                console.log(error);
                return false;
            }
        }
    }
    
    return (
        <>
            <h3>Login Component</h3>
            
            <div>
                <form onSubmit={formSubmit}>
                <div className="input-wrapper">
                    <input type="text" className="input-field" name="email" placeholder="Enter Email" onChange={(e) => setUserData((preVal) => ({ ...preVal, [e.target.name]:e.target.value }))}/>
                </div>
                <p>
                    {
                        error && !userData.email && <span className="input-error">Please Enter Email</span>
                    }
                </p>
                <div className="input-wrapper">
                    <input type="password" className="input-field" name="password" placeholder="Enter Password" onChange={(e) => setUserData((preVal) => ({ ...preVal, [e.target.name]:e.target.value }))}/>
                </div>
                <p>
                    {
                        error && !userData.password && <span className="input-error">Please Enter Password</span>
                    }
                </p>
                <div className="input-wrapper">
                    <button className="button">Login</button>
                </div>
                </form>
                {
                    success && <span className="input-success">Login Successfully</span>
                }
                {
                    error && <span className="input-error">Login Failed</span>
                }
            </div>
        </>
    )
}

export default RestaurantLogin