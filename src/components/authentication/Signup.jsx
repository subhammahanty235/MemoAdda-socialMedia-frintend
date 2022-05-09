import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64'

const Signup = () => {
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "",profilepic:'' });
    const handleClick = async (e) => {
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/auth/api/signUp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, emailid: credentials.email, password: credentials.password ,profilepic:credentials.profilepic})
        })
        const json = await responce.json();
        console.log(json)
        if (json.success===true) {
            navigate('/login')
        }
        else {
            alert("Some error occured")
        }
    }
    
    const [confirmed, setconfirm] = useState(false)
    const comparePw = (e) => {
        if (e.target.value === credentials.password) {
            setconfirm(true)
        }
        else {
            setconfirm(false)
        }
    }
    return (
        <div className="container">
            <h3 className="text-center mx-3 my-5">Create a new account</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={(e) => setcredentials({ ...credentials, name: e.target.value })} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={(e) => setcredentials({ ...credentials, email: e.target.value })}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="durl" className="form-label">Profile Pic </label><br/>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setcredentials({ ...credentials, profilepic: base64 })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Create Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={(e)=>setcredentials({...credentials ,password:e.target.value})} minLength={8} />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordc" className="form-label">Confirm Password</label>
                    <span className={`${confirmed === true ? "dot-green" : "dot-red"}`}></span>
                    <input type="password" className="form-control" id="passwordc" name='password' onChange={comparePw} minLength={8} />
                </div>


                <button type="submit" className="btn btn-outline-primary" disabled={confirmed !== true || credentials.name.length < 5 || credentials.password.length < 8}>Create Account</button>

            </form>
        </div>

    )
}
export default Signup