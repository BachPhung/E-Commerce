import './Login.scss'
import { useState } from 'react'
import { BsGoogle, BsGithub } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { login } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
export const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const { isFetching, error } = useSelector(state=>state.user)
    const Error = styled.div`
        color: red;
        font-size: 14px;
    `
    const handleLogin = (e) => {
        e.preventDefault()
        try{
            login(dispatch, {username, password})
            history.push('/')
        }
        catch{}
    }
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
                <div className='right' onSubmit={handleLogin}>
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
                        <button type='submit' disabled={isFetching}>Login</button>
                        {error && <Error>{error}</Error>}
                        <div className='move-login'>
                            <i>New to application</i><Link className='link' to='/register'><strong> Sign up now</strong></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}