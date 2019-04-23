import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import GlobalStyles from './globalStyles'
import { ProductList } from './pages/ProductList'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { SignUp } from './pages/SignUp'
import { Account } from './pages/Account'
import { PrivateRoute } from './components/PrivateRoute'
import store from './store'
import { LogIn } from './pages/LogIn'
import * as routes from './routes'

const App = () => (
  <Provider store={store}>
    <React.Fragment>
      <GlobalStyles />
      <Switch>
        <Route
          path={routes.HOMEPAGE}
          exact
          render={() => <Redirect to={routes.PRODUCT_LIST} />}
        />
        <Route path={routes.PRODUCT_LIST} exact component={ProductList} />
        <Route path={routes.CART} component={Cart} />
        <Route path={routes.SIGN_UP} component={SignUp} />
        <Route path={routes.LOGIN} component={LogIn} />
        <PrivateRoute path={routes.ACCOUNT} component={Account} />
        <Route path={routes.PRODUCT_DETAIL} component={ProductDetail} />
      </Switch>
    </React.Fragment>
  </Provider>
)

export default App
