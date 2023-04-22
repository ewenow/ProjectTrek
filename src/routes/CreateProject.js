import React from "react";
import { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext'
import { timestamp } from '../firebase/firebase'
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

// styles

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'sport', label: 'Sport' },
    { value: 'food', label: 'Food' },
    { value: 'eco', label: 'Eco' },
    { value: 'finance', label: 'Finance' },
]

export default function Create() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('projects')
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    // create user values for react-select
    useEffect(() => {
        if(documents) {
            setUsers(documents.map(user => {
                return { value: {...user, id: user.id}, label: user.displayName }
            }))
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Please select a project category.')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user')
            return
        }

        const assignedUsersList = assignedUsers.map(u => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const project = {
            name,
            details,
            assignedUsersList,
            createdBy,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: []
        }

        await addDocument(project)
        if (!response.error) {
            navigate('/')
        }
    }

    return (
            <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white border rounded shadow-sm overflow-auto" style={{ maxWidth: "90%", margin: "60px auto"}}>
                <h2 className="text-center mt-6">Create Your project idea!</h2>
                    <div className="form-group">
                        <label className="mt-3 w-75">
                            <span className="mt-3">Project name:</span>
                            <input
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="form-control mt-1"
                            />
                        </label>
                   </div>
                   <div className="form-group">
                        <label className="mt-3 w-100">
                            <span>Project details:</span>
                            <textarea
                                required
                                onChange={(e) => setDetails(e.target.value)}
                                value={details}
                                className="form-control mt-1 text-dark"
                            ></textarea>
                     </label>
                   </div>
                <div className="form-group">
                     <label className="mt-3 w-25">
                        <span>Deadline:</span>
                        <input
                            required
                            type="date"
                            onChange={(e) => setDueDate(e.target.value)}
                            value={dueDate}
                            className="form-control mt-1"
                        />
                    </label>
                </div>
                <div>
                    <label className="mt-3 w-25">
                        <span className="mt-2">Category:</span>
                        <Select
                            onChange={(option) => setCategory(option)}
                            options={categories}
                            className="mt-1"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="mt-3 w-25">
                        <span className="mt-2">Assign to:</span>
                        <Select
                            onChange={(option) => setAssignedUsers(option)}
                            options={users}
                            isMulti
                            className="mt-1"
                        />
                    </label>
                </div>
                <div className="d-flex justify-content-center">
                     <button className="btn btn-success mt-4 px-3 rounded-pill shadow-sm">Create!</button>
                    {formError && <p className="error alert alert-danger">{formError}</p>}
                </div>
            </form>
    )
}