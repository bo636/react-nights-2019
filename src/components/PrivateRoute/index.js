import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRouteComponent = ({
  customer = {},
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (customer.hasOwnProperty('id')) {
          return <Component {...routeProps} />
        }

        return (
          <Redirect
            to={{
              pathname: '/signup',
              state: {
                from: routeProps.location.pathname,
              },
            }}
          />
        )
      }}
    />
  )
}

const mapStateToProps = state => ({
  customer: state.customer,
})

const PrivateRoute = connect(
  mapStateToProps,
  null
)(PrivateRouteComponent)

export { PrivateRoute }
