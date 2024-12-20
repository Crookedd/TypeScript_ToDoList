import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import "./assets/styles/main.scss";
import store from './store/store.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
