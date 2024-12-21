import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./assets/styles/main.scss";
import store from './store/store';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);

