import React from 'react'
import { connect } from 'react-redux'

import Button from '../../components/Button'
import { Layout } from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { removeProduct as removeProductAction } from '../../store/cart/actions'

const CartView = ({ items, removeProduct }) => {
  return (
    <Layout>
      <H1>Your cart</H1>
      <ul>
        {items.map(item => (
          <li key={item.product.id}>
            <p>
              {item.product.name} - {item.quantity}
            </p>
            <Button
              type="button"
              onClick={() => removeProduct(item.product.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

const mapStateToProps = state => ({
  items: Object.keys(state.cart).map(productId => ({
    quantity: state.cart[productId],
    product: state.products.find(p => p.id === productId),
  })),
})

const actionCreators = {
  removeProduct: removeProductAction,
}

const Cart = connect(
  mapStateToProps,
  actionCreators
)(CartView)

export { Cart }
