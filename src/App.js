import { useDispatch } from 'react-redux'
import { appBodyMouseDown } from './App.registry'

import { Desktop } from './system/Desktop'

export const App = () => {
  const dispatch = useDispatch()

  const onBodyMouseDown = (args) => {
    const ignoredElements = ['ContextMenuItem']
    const elementId = args.target.attributes['data-element']?.value
    if (!ignoredElements.includes(elementId)) {
      dispatch(appBodyMouseDown())
    }
  }

  const onContextMenu = (event) => {
    event.preventDefault()
  }

  return (
    <div onMouseDown={onBodyMouseDown} onContextMenu={onContextMenu} className="text-sm">
      <Desktop />
    </div>
  )
}

export default App
