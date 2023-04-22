import React from 'react';
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border rounded shadow-sm" style={{ maxWidth: "30%", margin: "60px auto"}}>
            <h2 className="text-center">Log in</h2>
            <div className="form-group">
                <label htmlFor="email" className="mt-3 w-100">
                    <span>Email:</span>
                    <input
                        required
                        type="email"
                        className="form-control m-1"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="mt-3 w-100">
                    <span>Password:</span>
                    <input
                        required
                        type="password"
                        className="form-control m-1"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
            </div>
            <div className="d-flex justify-content-center">
                {!isPending && <button className="btn btn-primary mt-4 px-4 rounded-pill shadow-sm" >Log in</button>}
                {isPending && <button className="btn btn-primary mt-4 px-4 rounded-pill shadow-sm" disabled>Loading</button>}
                {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
        </form>
    )
}
