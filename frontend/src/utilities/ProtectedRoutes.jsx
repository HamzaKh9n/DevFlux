import { useNavigate, Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

const ProtectedRoutes = ({ auth: { loggedIn, setLoggedIn, Url, getMe: { getMe } } }) => {

    // const { getMe: { getMe } } = auth

    console.log('Helooo on protected routee')
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function runfunction() {
            const loginStatus = await getMe();
            console.log('Login Status', loginStatus)
        }

        runfunction();

        // if (!loggedIn) {
        //     console.log("notlogged in")
        //     navigate('/login')
        // }
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoutes