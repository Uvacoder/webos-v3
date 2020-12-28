import React, { createElement } from 'react'
import * as Icons from 'react-icons/io5'
import { ImCtrl as ShortcutIcon } from 'react-icons/im'

export const ContextMenu = ({ isFixed = false, menu = [] }) => {
  if (menu.length <= 0) return null

  const yesIcons = menu.some((item) => item && item.iconCode)

  return (
    <ul className="absolute left-0 top-0 bg-white bg-opacity-90 rounded w-52 text-sm mt-7 shadow-lg overflow-hidden">
      {menu.map((menuItem, key) => (
        <li
          key={key}
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
                    className: 'fill-current w-4 h-4 ml-2',
                  })
                ) : (
                  <span className="w-4 h-4 ml-2"></span>
                ))}
              <div className="ml-2">{menuItem.label}</div>
              {menuItem.shortcut && (
                <span className="absolute right-0 text-xs opacity-30 mr-3 flex items-center">
                  <ShortcutIcon />
                  <span>{menuItem.shortcut}</span>
                </span>
              )}
            </>
          ) : (
            <hr className="border-t w-full opacity-50" />
          )}
        </li>
      ))}
    </ul>
  )
}
