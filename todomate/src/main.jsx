import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

if(localStorage.getItem("schedule") == undefined) {
    localStorage.setItem("schedule", JSON.stringify({}))
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </RecoilRoot>
)
