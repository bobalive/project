import './App.css';
import {Provider} from "react-redux";
import {store} from "./Store/redux-store.ts";
import {Home} from "./pages/Home.tsx";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Collection} from "./pages/Collection.tsx";

function App() {
  return (
      <BrowserRouter>
      <Provider store={store}>
        <Routes>
            <Route path={'/collection/:id'} element={<Collection/>}></Route>
          <Route path={'/'} element={<Home/>}/>
        </Routes>
      </Provider>
      </BrowserRouter>
  )
}

export default App
