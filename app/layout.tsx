"use client"

import Navbar from '../component/navbar/Navbar'
import { store } from '../GlobalRedux/store'
import { Provider } from 'react-redux'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Food-Retsep</title>
      </head>
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
