import { createRoot } from 'react-dom/client'
import React from 'react'
import { registerSW } from 'virtual:pwa-register'

import './index.css'

import ConfigProvider from './ConfigProvider'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider />
  </React.StrictMode>,
)

const updateSW = registerSW({
  onNeedRefresh() {
    if (
      window.confirm(
        'Hay una versión nueva de la aplicación. ¿Querés actualizar?',
      )
    ) {
      void updateSW(true)
    }
  },
})
