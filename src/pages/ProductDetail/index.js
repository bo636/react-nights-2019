import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { Layout } from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { getProductById } from '../../api/products/get-product'
import { loadProduct as loadProductAction } from '../../store/products/actions'
import { addProduct as addProductAction } from '../../store/cart/actions'

import {
  Wrapper,
  ImgWrapper,
  Img,
  DetailsWrapper,
  Description,
  Price,
} from './styled'

const ProductView = ({ productId, product, addProduct, loadProduct }) => {
  const fetchProduct = async requestedProductId => {
    const downloadedProduct = await getProductById(requestedProductId)
    loadProduct(downloadedProduct)
  }

  useEffect(() => {
    // check on some specific property, which is present only in detail
    if (!product.hasOwnProperty('code')) {
      fetchProduct(productId)
    }
  })

  return (
    <Layout>
      <Wrapper>
        {product ? (
          <>
            <ImgWrapper>
              <Img src={product.image_url} />
            </ImgWrapper>
            <DetailsWrapper>
              <H1 textAlign="center">{product.name}</H1>
              <Price>{product.price.formatted_amount}</Price>
              <Description>{product.description}</Description>
              <Button onClick={() => addProduct(product.id)}>
                Add to Cart
              </Button>
              <Link to="/">Back</Link>
            </DetailsWrapper>
          </>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </Layout>
  )
}

const mapStateToProps = (state, ownProps) => ({
  product: state.products.find(p => p.id === ownProps.match.params.productId),
  productId: ownProps.match.params.productId,
})

const actionCreators = {
  loadProduct: loadProductAction,
  addProduct: addProductAction,
}

const ProductDetail = connect(
  mapStateToProps,
  actionCreators
)(ProductView)

export { ProductDetail }
