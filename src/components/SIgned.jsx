import React from 'react'
import { Link } from 'react-router-dom'
import "./Signed-in.css"
export function Signed(){
    return(
        <>
        <div className='navv'>
        <Link to='/'>Sign Out</Link>
        </div>
        <div className='containn'>
        <h3>Signed-in Succesfull </h3>
        <h2>Welcome User </h2>
        </div>
        
        </>
    )
}