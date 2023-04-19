import React from "react";
import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

export default function ActiveUsers() {
    const { isPending, error, documents } = useCollection('users')

    return (
        <div className=" d-flex bg-light px-3">
            {isPending && <div>Loading users...</div>}
            {error && <div>{error}</div>}
            {documents && (
                <div className="mt-4">
                    {documents.map(user => (
                        <ul key={user.id} className="shadow-lg p-2 rounded">
                            <li className="d-flex justify-content-center align-items-center flex-column">
                                <Avatar src={user.photoURL} style={{ width: '30px', height: '30px' }} />
                                <div>
                                    <span className="p-1">{user.displayName}</span>
                                    {user.online && <span className="d-inline-block rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: "#25ae5f"}}></span>}
                                </div>
                            </li>

                        </ul>
                    ))}
                </div>
            )}
        </div>
    )
}