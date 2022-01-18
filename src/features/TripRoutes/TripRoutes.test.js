// __tests__/fetch.test.js
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TripRoutes from '.';
import AppTestProvider from '../../test/AppTestProvider';

import {
  routes,
  directions,
  stopsNorthbound,
  stopsSouthbound,
} from '../../App.mock';

jest.mock(
  '../../components/select',
  () =>
    ({ id, label, options = [], onChange, value, placeholder }) => {
      return (
        <>
          <label htmlFor={id}>{label}</label>
          <select
            id={id}
            data-testid="select"
            value={value}
            onChange={onChange}
          >
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </>
      );
    }
);

const server = setupServer(
  rest.get('/Routes', (req, res, ctx) => {
    return res(ctx.json(routes));
  }),
  rest.get('/Directions/901', (req, res, ctx) => {
    return res(ctx.json(directions));
  }),
  rest.get('/Stops/901/0', (req, res, ctx) => {
    return res(ctx.json(stopsNorthbound));
  }),
  rest.get('/Stops/901/1', (req, res, ctx) => {
    return res(ctx.json(stopsSouthbound));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Tests for TripRoutes ', () => {
  test('test without url parameters', async () => {
    render(
      <AppTestProvider>
        <TripRoutes />
      </AppTestProvider>
    );

    // trigger change on routes
    await waitFor(() => {
      userEvent.selectOptions(
        screen.getByLabelText('Routes'),
        'METRO Blue Line'
      );
    });

    // trigger change on directions
    await waitFor(() => {
      expect(screen.getByText('Direction')).toBeInTheDocument();
      userEvent.selectOptions(screen.getByLabelText('Direction'), 'Northbound');
    });

    // first item should be correct
    await waitFor(() => {
      expect(screen.getByTestId('stops-list')).toBeInTheDocument();
    });
    const firstItemNorthbound = document.querySelector(
      '[data-testid="stops-list"] > li:first-child'
    );
    expect(firstItemNorthbound.textContent).toBe('Mall of America Station');

    // change directions
    userEvent.selectOptions(screen.getByLabelText('Direction'), 'Southbound');

    // first item should be correct
    await waitFor(() => {
      expect(screen.getByTestId('stops-list')).toBeInTheDocument();
    });
    const firstItemSouthbound = document.querySelector(
      '[data-testid="stops-list"] > li:first-child'
    );
    expect(firstItemSouthbound.textContent).toBe(
      'Target Field Station Platform 2'
    );
  });

  test('test without url parameters', async () => {
    render(
      <AppTestProvider url={['/901/0']}>
        <TripRoutes />
      </AppTestProvider>
    );

    // routes select value should be correct
    await waitFor(() => {
      screen.getByLabelText('Routes');
      expect(
        screen.getByRole('option', { name: 'METRO Blue Line' }).selected
      ).toBe(true);
    });

    // directions value should be correct
    await waitFor(() => {
      screen.getByLabelText('Direction');
      expect(screen.getByRole('option', { name: 'Northbound' }).selected).toBe(
        true
      );
    });
  });
});
