// Ivan

"use client";
import { Inter } from 'next/font/google'
import './page.css'
import './globals.css'

//main container
const Title = () => {
    return (
        <section className="main-container">                      
            <h1 id="title">Games</h1>
            <p id="description">What do we do without them?</p>
        </section>
    )
}
export default Title;