// import axios from "axios";
import { useEffect } from "react";
import sendCode from "../util/sendCode";
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";


const CallbackPage = () => {

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useOutletContext()

    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code")

        const init = async () => {
            const data = await sendCode(code)
            localStorage.setItem("token", data.sessionToken)
            localStorage.setItem("user", data.username)
            setIsLoggedIn(true)
            navigate("/")
        }
        init()
    }, []);


    return (
        <>
            <h2>Callback Page</h2>
        </>
    );
}

export default CallbackPage;