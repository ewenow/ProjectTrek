import React from "react";
import { useParams } from "react-router-dom"
import { useDocument } from '../hooks/useDocument'

// components
import ProjectComments from "./Comments"
import ProjectSummary from "./Summary"


export default function Project() {
    const { id } = useParams()
    const { document, error } = useDocument('projects', id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div>
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    )
}