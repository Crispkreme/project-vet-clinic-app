import React from 'react'

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <h2 className='font-bold text-gray-700 text-2xl dark:text-gray-400'>
            { children }
        </h2>
    )
}

export default Title
