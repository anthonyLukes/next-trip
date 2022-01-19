import useNextTrip from './useNextTrip';
import NextTripComponent from './NextTripComponent';

const NextTrip = () => {
  const {
    routesData,
    handleRoutesChange,
    selectedRoute,
    directionsData,
    handleDirectionChange,
    selectedDirection,
    stopsData,
    areStopsFetching,
  } = useNextTrip();

  return (
    <NextTripComponent
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
