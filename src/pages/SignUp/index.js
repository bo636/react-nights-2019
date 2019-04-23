import React from 'react'
import { Formik } from 'formik'

import { createCustomer } from '../../api/customers/create-customer'
import { Layout } from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { Form, GlobalFormError } from '../../components/Form'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { schema } from './schema'
import { getCustomerById } from '../../api/customers/get-customer'
import { setCustomer as setCustomerAction } from '../../store/customer/actions'
import { connect } from 'react-redux'
import { logIn } from '../../api/log-in'

const SignUpComponent = ({ globalError, setCustomer, history }) => {
  const initialValues = {
    firstName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  let isSubmitting = false

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true)
      const { ownerId } = await createCustomer(values)
      await logIn(values.email, values.password)
      const customerJson = await getCustomerById(ownerId)
      setCustomer(customerJson)
      history.push('/account')
    } catch (error) {
      globalError = error.message
    }
    setSubmitting(false)
  }

  return (
    <Layout>
      <H1 textAlign="center">Sign Up</H1>
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
            <Input name="firstName" label="First name" />
            <Input name="email" type="email" label="Email address" />
            <Input name="password" type="password" label="Password" />
            <Input
              name="passwordConfirm"
              type="password"
              label="Confirm password"
            />
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
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

const SignUp = connect(
  null,
  mapDispatchToProps
)(SignUpComponent)

export { SignUp }
