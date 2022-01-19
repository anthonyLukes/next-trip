import useNextTrip from './useNextTrip';
import NextTripComponent from './NextTripComponent';

const NextTrip = () => {
  const {
    routesData,
    routesErrorMessage,
    handleRoutesChange,
    selectedRoute,
    directionsData,
    directionsErrorMessage,
    handleDirectionChange,
    selectedDirection,
    stopsData,
    stopsErrorMessage,
    areStopsFetching,
  } = useNextTrip();

  const errorMessage =
    routesErrorMessage || directionsErrorMessage || stopsErrorMessage;

  return (
    <NextTripComponent
      errorMessage={errorMessage}
      routesData={routesData}
      handleRoutesChange={handleRoutesChange}
      selectedRoute={selectedRoute}
      directionsData={directionsData}
      handleDirectionChange={handleDirectionChange}
      selectedDirection={selectedDirection}
      stopsData={stopsData}
      areStopsFetching={areStopsFetching}
    />
  );
};

export default NextTrip;
