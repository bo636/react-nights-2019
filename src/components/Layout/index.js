import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { logout } from '../../store/customer/actions'

const Wrapper = styled.div`
  padding: 2rem;
`

const Header = styled.header`
  display: flex;
  border-bottom: 0.1rem solid gainsboro;
  justify-content: space-between;
  padding: 3rem;
`

const HeaderSection = styled.div``

const StyledLink = styled(Link)`
  margin: 0 1rem;
`

class LayoutClass extends Component {
  handleLogout = () => {
    this.props.logout()
  }

  render() {
    const { customer } = this.props

    return (
      <Fragment>
        <Header>
          <HeaderSection>
            <StyledLink to="/">All Products</StyledLink>
          </HeaderSection>
          {customer.hasOwnProperty('id') ? (
            <HeaderSection>
              <StyledLink to="/cart">My Cart</StyledLink>|
              <StyledLink to="/account">My Account</StyledLink>|
              <StyledLink onClick={this.handleLogout}>Logout</StyledLink>
            </HeaderSection>
          ) : (
            <HeaderSection>
              <StyledLink to="/signup">Sign Up</StyledLink>|
              <StyledLink to="/login">Log In</StyledLink>
            </HeaderSection>
          )}
        </Header>
        <Wrapper>{this.props.children}</Wrapper>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  customer: state.customer,
})

const mapDispatchToProps = {
  logout: logout,
}

const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutClass)

export { Layout }
