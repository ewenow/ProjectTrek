import React from 'react';
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarError, setAvatarError] = useState(null)
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, avatar)
            .then(() => {
                console.log('Signup successful')
            })
            .catch((error) => {
                console.error('Signup failed:', error)
            })
    }
    const handleAvatarChange = (e) => {
        setAvatar(null)
        let selected = e.target.files[0]
        console.log(selected)


        if (!selected) {
            setAvatarError('Select a file')
            return
        }

        if (!selected.type.includes('image')) {
            setAvatarError('Select an image file')
            return
        }
        if (selected.size > 250000) {
            setAvatarError('Keep an image smaller than 250kb')
            return
        }

        setAvatarError(null)
        setAvatar(selected)
        console.log('Avatar selected')
    }

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-white border rounded shadow-sm w-25" style={{ width: "30%", margin: "60px auto"}}>
            <h2 className="text-center">Sign up</h2>
            <div className="form-group">
                <label htmlFor="email" className="mt-3 w-100">
                    <span>Email:</span>
                    <input
                        required
                        type="email"
                        className="form-control mt-1"
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
                        className="form-control mt-1"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="name" className="mt-3 w-100">
                    <span>Name:</span>
                    <input
                        required
                        type="text"
                        className="form-control mt-1"
                        id="name"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="avatar" className="mt-3 w-100">
                <span>Avatar:</span>
                <input
                    required
                    type="file"
                    className="form-control mt-1"
                    id="avatar"
                    onChange={handleAvatarChange}
                />
                {avatarError && <div className="alert alert-danger mt-2">{avatarError}</div>}
                </label>
            </div>
            <div className="d-flex justify-content-center m-2">
                {!isPending && <button className="btn btn-primary mt-4 px-5 rounded-pill shadow-sm">Sign up</button>}
                {isPending && <button className="btn btn-primary mt-4 px-5 rounded-pill shadow-sm" disabled>Loading</button>}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
        </form>
    )
}

