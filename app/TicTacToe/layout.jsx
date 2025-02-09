// Ming Xuan

"use client";

import '../globals.css'
import './index.css';

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
        { children }
      </body>    
    </html>
  );
}


export default RootLayout;