import { Home } from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Cart } from "./pages/Cart";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Success from "./pages/Success";
import './index.scss'
import PreView from "./components/preView/preView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/products/:category'>
          <ProductList/>
        </Route>
        <Route path='/product/:id'>
          <Product/>
        </Route>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/success'>
          <Success/>
        </Route>
        <Route path='/preview'>
          <PreView/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;