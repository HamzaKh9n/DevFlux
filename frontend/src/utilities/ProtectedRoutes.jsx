import { useNavigate, Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

const ProtectedRoutes = ({ auth: { loggedIn, setLoggedIn, Url } }) => {

    console.log('Helooo on protected routee')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        try {
            if (!localStorage.getItem('accessToken')) {
                setLoggedIn(false)
                setIsLoading(false)
            }
            else {
                async function fetchUsername() {
                    setLoggedIn(true)
                    const response = await fetch(`${Url.backendUrl}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    const data = await response.json()
                    if (response.ok) {
                        // setUsername(data.username)
                        setLoggedIn(true);
                        console.log("baacha is logged in")
                    }
                    setIsLoading(false)
                }
                fetchUsername()
            }
        }
        catch {
            console.log('error fetching username from protected route..')
            setLoggedIn(false)
            setIsLoading(false)
        }


        if (!loggedIn && !isLoading) {
            console.log("notlogged in")
            navigate('/login')
        }
    }, [isLoading])

    return (
        <Outlet />
    )
}

export default ProtectedRoutes