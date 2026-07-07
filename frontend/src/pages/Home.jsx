import { useState, useEffect } from "react"


const Home = ({ Url, user, getMe }) => {

    let uname = user ? user.username : null
    // console.log("getmee", getMe)
    // const loginstatus = getMe();
    // if (loginstatus == true) {
    //     console.log("got the nigga")
    // }
    // else {
    //     console.log('PLS Login')
    // }

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Welcome to the Home Page {uname}
            </h1>
        </>
    )
}

export default Home