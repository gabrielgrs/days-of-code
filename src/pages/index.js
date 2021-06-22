import { Fragment, useState } from 'react'

import Search from 'templates/search'
import Profile from 'templates/Profile'

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <Fragment>
      <button onClick={() => setIsProfileOpen(true)}>My profile</button>
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <Search />
    </Fragment>
  )
}
