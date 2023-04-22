import React from "react";
import { useCollection } from '../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ProjectList from '../components/ProjectList'
import ProjectFilter from './ProjectFilter'


export default function Dashboard() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection('projects')
    const [filter, setFilter] = useState('all')

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const projects = documents ? documents.filter(document => {
        switch(filter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if(u.id === user.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
            case 'fashion':
            case 'sport':
            case 'food':
            case 'eco':
            case 'finance':
                console.log(document.category, filter)
                return document.category === filter
            default:
                return true
        }
    }) : null

    return (
        <div className="text-center mt-8 p-2 overflow-auto" style={{height: "100vh"}}>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {documents && <ProjectFilter changeFilter={changeFilter} />}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}