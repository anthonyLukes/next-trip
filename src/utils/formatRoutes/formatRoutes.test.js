import formatRoutes from './index'

const input = [
  {
      Description: "METRO Blue Line",
      ProviderID: "0",
      Route: "901"
  },
  {
      Description: "METRO Green Line",
      ProviderID: "0",
      Route: "902",
  }
];

describe('formatRoutes', () => {
  test('Should properly format values', () => {
    expect(formatRoutes(input)).toEqual([
      {
          label: "METRO Blue Line",
          providerId: "0",
          value: "901"
      },
      {
          label: "METRO Green Line",
          providerId: "0",
          value: "902",
      }
    ]);
  });
});

