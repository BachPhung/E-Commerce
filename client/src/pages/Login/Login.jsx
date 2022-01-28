import './Login.scss'
import { useState} from 'react'
import { BsGoogle, BsGithub } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
export const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    
    return (
        <div className='login'>
            <div className='wrapper'>
                <div className='left'>
                    <div className='loginButtons'>
                        <h1>Methods</h1>
                        <div className='facebook btn'>
                            <div className='div-icon'>
                                <FaFacebookF className='icon' />
                            </div>
                            <div className='text'>Facebook</div>
                        </div>
                        <div className='google btn'>
                            <div className='div-icon'>
                                <BsGoogle className='icon' />
                            </div>
                            <div className='text'>
                                Google
                            </div>
                        </div>
                        <div className='github btn'>
                            <div className='div-icon'>
                                <BsGithub className='icon' />
                            </div>
                            <div className='text'>Github</div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <form className='form'>
                        <h1>Login</h1>
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
                            onChange={e => setPassWord(e.target.value)}
                            autoComplete='on'
                        ></input>
                        <button>Login</button>
                        <div className='move-login'>
                            <i>New to application</i><strong> Sign up now</strong>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}