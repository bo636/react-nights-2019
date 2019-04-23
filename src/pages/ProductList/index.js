import React from 'react'
import { connect } from 'react-redux'

import { getProducts } from '../../api/products/get-products'
import { useApi } from '../../api/use-api'

import { Layout } from '../../components/Layout'
import Loader from '../../components/Loader'
import { H1 } from '../../components/Typography'
import { Pagination } from '../../components/Pagination'
import * as routes from '../../routes'

import * as cartActions from '../../store/cart/actions'
import Product from './Product'
import { ProductsWrap } from './styled'

const getAtrinbValue = (key, url) => {
  const rest = url.substring(url.search(key) + key.length + 1)
  if (rest.search('&') === -1) {
    return rest
  }
  return rest.substring(0, rest.search('&'))
}

const Products = ({ match, location, addProduct }) => {
  let pageSize = getAtrinbValue(routes.PAGE_SIZE_KEYWORD, location.search)
  if (!(pageSize > 0)) {
    pageSize = 30
  }

  let page = getAtrinbValue(routes.PAGE_KEYWORD, location.search)
  if (!(page > 0)) {
    page = 1
  }

  const { data: res, isLoading } = useApi(
    () => getProducts({ page: { number: page, size: pageSize } }),
    [page]
  )

  const handleAddToCart = productId => addProduct(productId)

  return (
    <Layout>
      <H1 textAlign="center">E-Commerce app</H1>
      {isLoading && <Loader />}
      {res && (
        <>
          <Pagination
            pages={res.meta.page_count}
            activePage={match.params.page}
          />
          <ProductsWrap>
            {res.data.map(product => (
              <Product
                key={product.id}
                node={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </ProductsWrap>
        </>
      )}
    </Layout>
  )
}

const mapDispatchToProps = {
  addProduct: cartActions.addProduct,
}

const ProductList = connect(
  null,
  mapDispatchToProps
)(Products)

export { ProductList }
