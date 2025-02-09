// Ivan

"use client";

import './globals.css'
import NavBar from './Navbar.jsx'

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Games</title>
        <link rel='icon' href='../public/favicon.ico' />
      </head>
      <body>
        <NavBar />
        { children }
      </body>    
    </html>
  );
}


export default RootLayout;