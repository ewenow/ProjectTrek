import React from "react";
import { useState } from "react"
import { timestamp } from "../firebase/firebase"
import { useAuthContext } from "../hooks/useAuthContext"
import { useFirestore } from "../hooks/useFirestore"
import Avatar from "../components/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({ project }) {
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    const [newComment, setNewComment] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd],
        })
        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className="bg-light shadow-lg p-4 m-4 rounded d-flex justify-content-start align-items-center flex-wrap">
                <h4>Comments:</h4>
                <ul className="m-0 p-0">
                    {project.comments.length > 0 && project.comments.map(comment => (
                        <li key={comment.id} className="list-unstyled">
                            <div className="mt-3 bg-light shadow p-3 rounded border-start border-bottom border-dark">
                            <Avatar src={comment.photoURL} />
                                <p>{comment.displayName}</p>
                                <p><strong>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</strong></p>
                                <p className="bg-light shadow p-2 rounded-3 border border-dark">{comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            <form onSubmit={handleSubmit} className="shadow-lg p-4 my-4 rounded d-flex justify-content-start align-items-end flex-column" style={{width: "100%"}}>
                <label className="flex-grow-1 w-100">
                    <span>Add comment:</span>
                    <textarea
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                        className="rounded shadow w-100 mt-2"
                    ></textarea>
                </label>
                <button className="btn border-dark my-3 mx-2 px-4 rounded-pill shadow-sm">Send!</button>
            </form>
        </div>
    )
}
