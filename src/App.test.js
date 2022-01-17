// __tests__/fetch.test.js
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from './App'
import {routes, directions, stops} from './App.mock'
// import { selectItem } from './selectItem'
// import {selectOption} from './selectOption'

jest.mock("./components/select", () => ({ id, label, options = [], onChange, value, placeholder }) => {
  return (<><label htmlFor={id}>{label}</label><select id={id} data-testid="select" value={value} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select></>
    
  );
});

const server = setupServer(
  rest.get('/Routes', (req, res, ctx) => {
    return res(ctx.json(routes))
  }),
  rest.get('/Directions/901', (req, res, ctx) => {
    return res(ctx.json(directions))
  }),
  rest.get('/Stops/901/0', (req, res, ctx) => {
    return res(ctx.json(stops))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('test without url parameters', async () => {
  render(<App />)
  const header = screen.getByTestId('header');
  expect(header).toHaveTextContent('Metro Transit - Next Trip')
  
  // trigger change on routes
  // fireEvent.change(screen.getByTestId("routes"), {
  //   target: { value: "901" },
  // });
  // const container = screen.getByTestId('trip-routes');
  // // await selectItem(container, 'Routes', 'METRO BLUE Line')
  // const routeWrapper = document.querySelector('#routes-wrapper')
  // await selectOption(routeWrapper, 'METRO BLUE Line')
  await waitFor(() => {
    userEvent.selectOptions(screen.getByLabelText('Routes'), 'METRO Blue Line');
  })
  

  // trigger change on directions
  await waitFor(() => {
    expect(screen.getByText('Direction')).toBeInTheDocument()
    // fireEvent.change(screen.getByTestId("direction"), {
    //   target: { value: "0" },
    // });
  })
  

  // first item should be correct

  // change directions

  // first item should be correct
})

// with url params

// routes select value should be correct

// directions value should be correct


