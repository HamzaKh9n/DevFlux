import { useState, useEffect } from "react"


const Home = ({ Url, user }) => {

    let uname = user ? user.username : null

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Welcome to the Home Page {uname}
            </h1>
        </>
    )
}

export default Home