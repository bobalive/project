import './App.css';
import {Provider} from "react-redux";
import {store} from "./Store/redux-store.ts";
import {Home} from "./pages/Home.tsx";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {AddCollection} from "./pages/AddCollection.tsx";
import {AddItems} from "./pages/AddItems.tsx";


function App() {
  return (
      <BrowserRouter>
      <Provider store={store}>
            <Routes>
                <Route path={'/*'} element={<Home/>} />
                <Route path={'/add-collection'} element={<AddCollection/>}/>
                <Route path={'/add-item/:id'} element={<AddItems/>}/>
                <Route path={'/edit-item/:id/:itemId'} element={<AddItems/>}/>
                <Route path={'/edit-collection/:id'}  element={<AddCollection/>}/>
            </Routes>


      </Provider>
      </BrowserRouter>
  )
}

export default App
