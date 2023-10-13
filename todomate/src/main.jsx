import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    RecoilRoot
} from 'recoil';


if(localStorage.getItem("schedule") == undefined) {
    localStorage.setItem("schedule", JSON.stringify({}))
}

if(localStorage.getItem("diary") == undefined) {
    localStorage.setItem("diary", JSON.stringify({}))
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </RecoilRoot>
)