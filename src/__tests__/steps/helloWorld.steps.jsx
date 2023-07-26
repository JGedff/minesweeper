import React from 'react'
import { render, screen } from '@testing-library/react'
import { HelloWorld } from '../../components/HelloWorld.jsx'
import '@testing-library/jest-dom/extend-expect'

export const helloWorldSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  Given(/^Hello World$/, () => {
    render(<HelloWorld />)
  })
  Then(/^I should see "([^"]*)"$/, () => {
    const helloWorld = screen.getByTestId('helloWorld')

    expect(helloWorld).toHaveTextContent('Hello World!')
  })
}

export default helloWorldSteps
