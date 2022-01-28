import './Register.scss'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { VscError } from 'react-icons/vsc'

export const Register = () => {
    const history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [status, setStatus] = useState(false)
    const [submit, setSubmited] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8800/api/auth/register', { username, password })
            setSubmited(true)
            setUserName('')
            setPassWord('')
            setStatus(true)
            setTimeout(() => history.push('/login'), 1500)
        }
        catch (err) {
            setSubmited(true)
            setStatus(false)
        }
    }
    return (
        <div className='register'>
            <div className='wrapper'>
                <form className='form'>
                    <h1>Register</h1>
                    <input
                        type='text'
                        value={username}
                        placeholder='Username'
                        onChange={e => setUserName(e.target.value)}
                        autoComplete='on'
                    ></input>
                    <input
                        type='password'
                        value={password}
                        placeholder='Password'
                        autoComplete='on'
                        onChange={e => setPassWord(e.target.value)}
                    ></input>
                    <button onClick={handleRegister}>Start</button>
                    <div className='message'>
                        {status
                            ? <div className={submit ? 'show-success' : 'hide'} >Register Sucess<AiOutlineCheck /></div>
                            : <div className={submit ? 'show-fail' : 'hide'}>Register Fail <VscError /></div>
                        }
                    </div>
                    <div className='move-login'>
                        <i>In case you have had an account</i><strong> Sign in now</strong>
                    </div>
                </form>
            </div>
        </div>
    )
}