import React, { createElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoRadioButtonOn as SystemIcon } from 'react-icons/io5'
import * as TrayIcons from 'react-icons/io5'

import { ContextMenu } from '../ContextMenu'
import { contextMenuStatus } from '../ContextMenu/ContextMenu.registry'

export const TopBar = ({ active = false }) => {
  const dispatch = useDispatch()

  const [realActive, setRealActive] = useState(false)
  const [systemMenuActive, setSystemMenuActive] = useState(false)

  const { contextMenuVisibility } = useSelector(({ ContextMenu }) => ({
    contextMenuVisibility: ContextMenu.visibility,
  }))

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setRealActive(true)
      }, 1000)
    }
  }, [active])

  useEffect(() => {
    if (!contextMenuVisibility) {
      setSystemMenuActive(false)
    }
  }, [contextMenuVisibility])

  const onSystemIconToggle = () => {
    setSystemMenuActive(!systemMenuActive)
    dispatch(contextMenuStatus(true))
  }

  const systemMenu = [
    {
      label: 'File',
      shortcut: 'F',
      iconCode: null,
    },
    {
      label: 'Edit',
      children: [],
    },
    {
      label: 'Selection',
      children: [],
    },
    {
      label: 'View',
      children: [],
    },
    {
      label: 'Go',
      children: [],
    },
    null,
    {
      label: 'Logout',
      iconCode: 'IoPower',
    },
  ]

  const appMenu = [
    {
      label: 'File',
      children: [],
    },
    {
      label: 'Edit',
      children: [],
    },
    {
      label: 'Selection',
      children: [],
    },
    {
      label: 'View',
      children: [],
    },
    {
      label: 'Go',
      children: [],
    },
    {
      label: 'Run',
      children: [],
    },
    {
      label: 'Terminal',
      children: [],
    },
    {
      label: 'Help',
      children: [],
    },
  ]

  const trayItems = [
    {
      label: 'Power',
      iconCode: 'IoBatteryCharging',
    },
    {
      label: 'Pulse',
      iconCode: 'IoPulse',
    },
    {
      label: 'Connectivity',
      iconCode: 'IoCodeWorking',
    },
  ]

  return (
    <div
      className={
        'flex duration-500 transition-all justify-between items-center px-3 mx-1 shadow-lg rounded-b fixed z-50 left-0 right-0 bg-white bg-opacity-90 py-0.5 ' +
        (realActive ? 'top-0 opacity-100' : '-top-10 opacity-0')
      }
    >
      <div className="flex items-center justify-start">
        <SystemIcon
          onClick={onSystemIconToggle}
          className="relative w-4 h-4 fill-current"
        />
        {systemMenuActive && <ContextMenu menu={systemMenu} />}
        <div className="font-semibold mx-3">App Name</div>
        <ul className="flex items-center justify-start gap-3 ml-1">
          {appMenu.map((menuItem, key) => (
            <li key={key}>{menuItem.label}</li>
          ))}
        </ul>
      </div>
      <ul className="flex items-center justify-end">
        {trayItems.map((trayItem, key) => (
          <li key={key}>
            <TrayIcon iconCode={trayItem.iconCode} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const TrayIcon = ({ iconCode }) => {
  return createElement(TrayIcons[iconCode] ?? TrayIcons.IoHelpCircleOutline, {
    className: 'fill-current w-5 h-5 ml-3',
  })
}
