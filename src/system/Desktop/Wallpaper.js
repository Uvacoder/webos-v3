import React, { useState } from 'react'

/**
 * Wallpaper
 * @param {Function} wallpaperReady
 */
export const Wallpaper = ({ wallpaperReady = () => {}, image = '' }) => {
  const [active, setActive] = useState(false)

  const onLoad = () => {
    wallpaperReady()
    setActive(true)
  }

  return (
    <img
      style={{
        transform: `scale(${active ? 1 : 1.2})`,
      }}
      onLoad={onLoad}
      className={
        'fixed top-0 left-0 object-cover h-screen w-screen duration-1000 transition-all ' +
        (active ? 'opacity-100' : 'opacity-0')
      }
      src={image}
      alt=""
    />
  )
}
