import React from 'react'
import Auth from '@/components/auth/auth'

const user = false
const Page = () => {
  return (
    <div>
      {!user ? <Auth /> : <div>Loading...</div>}
    </div>
  )
}

export default Page