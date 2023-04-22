import React from "react";
import Avatar from "../components/Avatar"
import { useFirestore } from "../hooks/useFirestore"
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        <div className="bg-light shadow-lg p-4 m-4 rounded d-flex justify-content-center align-items-center flex-wrap">
            <div className="p-2">
                <h2 style={{color: '#5f4193'}}>{project.name}</h2>
                <p>Deadline: {project.dueDate.toDate().toDateString()}</p>
                <p className="details">
                    {project.details}
                </p>

                <div className="d-flex justify-content-start align-items-center flex-wrap">
                    <p><strong>Team members:</strong></p>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id} className="m-2" >
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button className="btn border-dark mt-4 px-4 rounded-pill shadow-sm" onClick={handleClick}>Completed!</button>
            )}
        </div>
    )
}