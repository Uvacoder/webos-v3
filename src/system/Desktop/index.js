import React, { useState } from 'react'

import { TopBar } from './TopBar'
import { Workspace } from './Workspace'
import { AppDrawer } from './AppDrawer'
import { Wallpaper } from './Wallpaper'
import { AppLauncher } from './AppLauncher'

export const Desktop = () => {
  const [topBarActive, setTopBarActive] = useState(false)

  const wallpaperReady = () => {
    setTopBarActive(true)
  }

  return (
    <>
      <TopBar active={topBarActive} />
      <Workspace />
      <AppDrawer />
      <AppLauncher />
      <Wallpaper image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F894292.jpg&f=1&nofb=1"} wallpaperReady={wallpaperReady} />
    </>
  )
}
