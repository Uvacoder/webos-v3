import React, { createElement } from 'react'
import { useDispatch } from 'react-redux'
import * as Icons from 'react-icons/io5'
import { ImCtrl as ShortcutIcon } from 'react-icons/im'

import { contextMenuStatus } from '../ContextMenu/ContextMenu.registry'

export const ContextMenu = ({ menu = [], position = null }) => {
  const dispatch = useDispatch()

  if (menu.length <= 0) return null

  const yesIcons = menu.some((item) => item && item.iconCode)

  const computedPosition = (position) => {
    // TODO: Compute axis based on screen width and height
    return position
      ? {
          left: `${position.left}px`,
          top: `${position.top}px`,
        }
      : {}
  }

  const onItemClick = (item) => {
    dispatch(contextMenuStatus(false))
  }

  return (
    <ul
      className={`left-0 top-0 bg-white bg-opacity-90 rounded w-52 text-sm shadow-xl overflow-hidden ${
        position ? 'fixed' : 'mt-7 absolute'
      }`}
      style={computedPosition(position)}
    >
      {menu.map((menuItem, key) => (
        <li
          key={key}
          onClick={() => onItemClick(menuItem)}
          data-element="ContextMenuItem"
          className={
            'flex items-center' +
            (menuItem
              ? ' py-1 hover:bg-blue-600 hover:text-white transition-colors duration-100'
              : '')
          }
        >
          {menuItem ? (
            <>
              {yesIcons &&
                (menuItem.iconCode && Icons[menuItem.iconCode] ? (
                  createElement(Icons[menuItem.iconCode], {
                    className: 'fill-current w-4 h-4 ml-2 pointer-events-none',
                  })
                ) : (
                  <span className="w-4 h-4 ml-2 pointer-events-none"></span>
                ))}
              <div className="ml-2 pointer-events-none">{menuItem.label}</div>
              {menuItem.shortcut && (
                <span className="absolute right-0 text-xs opacity-30 mr-3 flex items-center pointer-events-none">
                  <ShortcutIcon className="pointer-events-none" />
                  <span className="pointer-events-none">
                    {menuItem.shortcut}
                  </span>
                </span>
              )}
            </>
          ) : (
            <hr className="border-t w-full opacity-50 pointer-events-none" />
          )}
        </li>
      ))}
    </ul>
  )
}
