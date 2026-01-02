// app/layout.tsx - UPDATED
'use client'

import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/providers/AuthProvider'
import LoginModal from '@/components/auth/LoginModal'
import RegisterModal from '@/components/auth/RegisterModal'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar 
            onLoginClick={() => setShowLoginModal(true)}
            onRegisterClick={() => setShowRegisterModal(true)}
          />
          <main className="flex-grow">{children}</main>
          <Footer />
          
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)}
            onSwitchToRegister={() => {
              setShowLoginModal(false)
              setShowRegisterModal(true)
            }}
          />
          <RegisterModal 
            isOpen={showRegisterModal} 
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false)
              setShowLoginModal(true)
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}