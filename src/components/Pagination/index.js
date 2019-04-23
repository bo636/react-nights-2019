import * as React from 'react'
import range from 'ramda/src/range'
import map from 'ramda/src/map'
import { Link } from 'react-router-dom'

import * as routes from '../../routes'

import { List, ListItem } from './styled'

const renderPaginationItem = number => (
  <ListItem key={number}>
    <Link
      to={
        `${routes.PRODUCT_LIST}?${routes.PAGE_KEYWORD}${number}` +
        routes.PAGE_SIZE_KEYWORD +
        '=' +
        30
      }
    >
      {number}
    </Link>
  </ListItem>
)

const Pagination = ({ pages }) => (
  <List>{map(renderPaginationItem, range(1, pages + 1))}</List>
)

export { Pagination }
