import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.scss';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const App: React.FunctionComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(!!cookies.get('Authorization') || false)
  const [error, setError] = useState(null)
  const [data, setData] = useState({ email: '', id: '', name: '' })
  const [loading, setLoading] = useState(false)

  function sendData(e: React.SyntheticEvent) {
    setLoading(true)
    e.preventDefault()
    console.log(email, password)
    axios.post('/api/auth/user', {
      email: email,
      password: password
    })
      .then((res) => { setToken(true); cookies.set("Authorization", { tokenType: res.data.data.tokenType, accessToken: res.data.data.accessToken }, { expires: new Date(res.data.data.expiresAt), path: '/' }) })
      .catch((err) => setError(err.response.status))
  }

  
  useEffect(() => {
    setLoading(true)
    axios.get('/api/tager/user/profile', {
      headers: {
        "Authorization": `${cookies.get('Authorization') ? cookies.get('Authorization').tokenType : ''} ${cookies.get('Authorization') ? cookies.get('Authorization').accessToken : ''}`
      }
    })
      .then(res => { setData(res.data.data); setLoading(false) })
  }, [token])

  return (
    token ? <div className="profile-page">
      {loading ? <h2>Загрузка...</h2> :
        data ?
          <div className="profile-info">
            <p>email: {data.email}</p>
            <p>id: {data.id}</p>
            <p>name: {data.name}</p>
            <button onClick={() => { setToken(false); cookies.remove('Authorization') }}>Exit</button>
          </div>
          : ''
      }
    </div> : <div>
      <div className="login-page">
        <form action="">
          {error === 400 ? <p>Неверная почта или пароль</p> : ''}
          <label htmlFor="email">Email</label>
          <input required type="text" value={email} onChange={(e) => { setEmail(e.target.value); setError(null) }} placeholder="Write your email" name="email" />
          <label htmlFor="password">Password</label>
          <input required type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(null) }} placeholder="Write your password" name="password" />
          <button onClick={(e: React.SyntheticEvent) => sendData(e)}>Submit</button>
        </form>
      </div>
    </div>
  )

}

export default App;
