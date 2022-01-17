import formatDirections from './index';

const input = [
  {
    Text: 'Northbound',
    Value: '0',
  },
  {
    Text: 'Southbound',
    Value: '1',
  },
];

describe('formatDirections', () => {
  test('Should properly format values', () => {
    expect(formatDirections(input)).toEqual([
      {
        label: 'Northbound',
        value: '0',
      },
      {
        label: 'Southbound',
        value: '1',
      },
    ]);
  });
});
