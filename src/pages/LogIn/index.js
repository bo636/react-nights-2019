import React from 'react'
import { Formik } from 'formik'

import { Layout } from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { Form, GlobalFormError } from '../../components/Form'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { schema } from './schema'
import { logIn } from '../../api/log-in'
import { getCustomerById } from '../../api/customers/get-customer'
import { connect } from 'react-redux'
import { setCustomer as setCustomerAction } from '../../store/customer/actions'

const LogInComponent = ({ globalError, setCustomer, history }) => {
  const initialValues = {
    email: '',
    password: '',
  }

  let isSubmitting = false

  const handleSubmit = async values => {
    try {
      isSubmitting = true
      const ownerId = await logIn(values.email, values.password)
      const customerJson = await getCustomerById(ownerId)
      setCustomer(customerJson)
      history.push('/account')
    } catch (error) {
      console.log('handleSubmit error' + error.message)
      globalError = error.message
    }
    isSubmitting = false
  }

  return (
    <Layout>
      <H1 textAlign="center">Log in</H1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {props => (
          <Form onSubmit={props.handleSubmit}>
            {Boolean(globalError) && (
              <GlobalFormError>{globalError}</GlobalFormError>
            )}
            <Input name="email" type="email" label="Email address" />
            <Input name="password" type="password" label="Password" />
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Logging In...' : 'Log In'}
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

const mapDispatchToProps = {
  setCustomer: setCustomerAction,
}

const LogIn = connect(
  null,
  mapDispatchToProps
)(LogInComponent)

export { LogIn }
