import React from "react";
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'


export default function ProjectList({ projects }) {
    console.log(projects)

    return (
        <div className="bg-light shadow-lg p-3 m-2 rounded d-flex justify-content-center align-items-center flex-wrap">
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id} className="bg-light shadow-lg p-3 m-2 rounded d-flex justify-content-center align-content-center flex-column text-decoration-none text-dark">
                    <h4 className="text-decoration-none" style={{color: '#5f4193'}}>{project.name}</h4>
                    <p>Deadline: {project.dueDate.toDate().toDateString()}</p>

                    <div className="d-flex justify-content-center align-items-center flex-row">
                        <ul className="list-unstyled d-flex justify-content-center align-items-center flex-row">
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoURL} className="m-2">
                                    <Avatar src={user.photoURL}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}

