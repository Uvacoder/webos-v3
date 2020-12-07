import React, { useEffect, useState } from 'react'

import { IoLeaf } from 'react-icons/io5'

export const TopBar = ({ active = false }) => {
  const [realActive, setRealActive] = useState(false)

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setRealActive(true)
      }, 1000);
    }
  }, [active])

  return (
    <div
      className={
        'flex duration-500 transition-all justify-between items-center px-2 mx-1 shadow-lg rounded-b fixed z-50 left-0 right-0 bg-white bg-opacity-90 py-0.5 ' +
        (realActive ? 'top-0 opacity-100' : '-top-10 opacity-0')
      }
    >
      <div className="flex items-center justify-start">
        <IoLeaf />
        <div className="font-semibold mx-3">App Name</div>
        <ul className="flex items-center justify-start gap-3">
          <li>File</li>
          <li>Edit</li>
          <li>Selection</li>
          <li>View</li>
          <li>Go</li>
          <li>Run</li>
          <li>Terminal</li>
          <li>Help</li>
        </ul>
      </div>
      <ul className="flex items-center justify-end">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  )
}
