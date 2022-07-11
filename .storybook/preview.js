export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'boxis',
    values: [
      {
        name: 'boxis',
        value: '#F2F2F2',
      },
    ],
  },
}