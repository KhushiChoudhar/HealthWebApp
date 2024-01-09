// import { useRef, useState } from "react"
import "./Register.scss"
import show from './show.png'
const Register = () => {
    /*
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleName = () =>{
        setName(nameRef.current.value)
    }
    const handleRegister = () =>{
        setEmail(emailRef.current.value)
    }
    const handleFinish = () =>{
        setPassword(passwordRef.current.value)
    }
*/
    return (
        <div className='register'>

            <div className="top">
                <h2>Mental Friend</h2>
                <button className="login">Log In</button>
            </div>


            <h2 className="text">Join Mental Friend</h2>

            <div className="content">

                <div className="left">

                    <div className="input">
                        <div className="field">
                            <span>Name: </span>
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div className="field">
                            <span>Email: </span>
                            <input type="email" placeholder="Email Address" />
                        </div>
                        <div className="field">
                            <span>Password: </span>
                            <input type="password" placeholder="Password" />
                        </div>

                        <button className="sign-up">Sign Up</button>
                    </div>
                </div>

                <div className="right">
                    <img src={show} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Register