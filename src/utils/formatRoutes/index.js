const formatRoutes = (input) => {
  try {
    return input.map(({Description, ProviderID, Route}) => ({
      label: Description,
      providerId: ProviderID,
      value: Route
    }))
  } catch (error) {
    return input
  }
}

export default formatRoutes
