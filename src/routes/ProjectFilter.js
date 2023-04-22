import React from "react";
import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales', 'fashion', 'sport', 'food', 'eco']

export default function ProjectFilter({ changeFilter }) {
    const [currentFilter, setCurrentFilter] = useState('all')

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }

    return (
        <div className="my-3 mx-auto p-2">
            <nav>
                {filterList.map((f) => (
                    <button key={f}
                            onClick={() => handleClick(f)}
                            className={`btn btn-light m-2 rounded-4 shadow-sm ${currentFilter === f ? 'active' : ''}`}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}
