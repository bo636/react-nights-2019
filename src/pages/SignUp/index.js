import React, { Component } from 'react'
import { Formik } from 'formik'

import { createCustomer } from '../../api/customers/create-customer'
import { Layout } from '../../components/Layout'
import { H1 } from '../../components/Typography'
import { Form, GlobalFormError } from '../../components/Form'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import { schema } from './schema'
import { getCustomerById } from '../../api/customers/get-customer'
import { setCustomer } from '../../store/customer/actions'
import { connect } from 'react-redux'
import { logIn } from '../../api/log-in'

class SignUpComponent extends Component {
  state = {
    globalError: '',
  }

  initialValues = {
    firstName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true)
      const { ownerId } = await createCustomer(values)
      await logIn(values.email, values.password)
      const customerJson = await getCustomerById(ownerId)
      this.props.setCustomer(customerJson)
      this.props.history.push('/account')
    } catch (error) {
      this.setState({
        globalError: error.message,
      })
    }
    setSubmitting(false)
  }

  render() {
    const { globalError } = this.state

    return (
      <Layout>
        <H1 textAlign="center">Sign Up</H1>
        <Formik
          initialValues={this.initialValues}
          validationSchema={schema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
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
}

const mapDispatchToProps = {
  setCustomer,
}

const SignUp = connect(
  null,
  mapDispatchToProps
)(SignUpComponent)

export { SignUp }
