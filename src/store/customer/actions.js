export const SET_CUSTOMER = 'customer/SET_CUSTOMER'
export const LOGOUT = 'customer/LOGOUT'

export const setCustomer = customer => ({
  type: SET_CUSTOMER,
  payload: customer,
})

export const logout = () => ({
  type: LOGOUT,
})
