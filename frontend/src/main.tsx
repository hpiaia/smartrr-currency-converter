import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ConversionNotFound from './components/ConversionNotFound.tsx'
import ConversionPage from './pages/ConversionPage.tsx'
import MainPage from './pages/MainPage.tsx'
import SelectConversionPage from './pages/SelectConversionPage.tsx'
import GraphqlProvider from './providers/GraphqlProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GraphqlProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<SelectConversionPage />} />
            <Route path="/:conversionId" element={<ConversionPage />} />
            <Route path="*" element={<ConversionNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GraphqlProvider>
  </React.StrictMode>,
)
