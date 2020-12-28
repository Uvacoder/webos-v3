import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContextMenu } from '../ContextMenu'
import { contextMenuStatus } from '../ContextMenu/ContextMenu.registry'

export const Workspace = () => {
  const dispatch = useDispatch()

  const { contextMenuVisibility } = useSelector(({ ContextMenu }) => ({
    contextMenuVisibility: ContextMenu.visibility,
  }))

  const [customContextMenuPosition, setCustomContextMenuPosition] = useState(null)

  const onContextMenu = (event) => {
    setCustomContextMenuPosition({
      left: event.clientX,
      top: event.clientY
    })
    dispatch(contextMenuStatus(true))
  }

  useEffect(() => {
    if (!contextMenuVisibility) {
      setCustomContextMenuPosition(false)
    }
  }, [contextMenuVisibility])

  return (
    <div
      onContextMenu={onContextMenu}
      className="fixed left-0 top-0 h-full w-full z-10"
    >
      {customContextMenuPosition && (
        <ContextMenu
          position={customContextMenuPosition}
          menu={[
            {
              label: 'Preferences',
              iconCode: 'IoSettings',
            },
            {
              label: 'Change Wallpaper',
              iconCode: 'IoImage',
            },
            null,
            {
              label: 'Lock',
              iconCode: 'IoLockClosed',
            },
            {
              label: 'Logout',
              iconCode: 'IoPower',
            },
          ]}
        />
      )}
    </div>
  )
}
