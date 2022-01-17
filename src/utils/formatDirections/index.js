const formatDirections = (input) => {
  try {
    return input.map(({ Text, Value }) => ({
      label: Text,
      value: Value,
    }));
  } catch (error) {
    return input;
  }
};

export default formatDirections;
