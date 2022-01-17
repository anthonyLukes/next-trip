import useTripRoutes from './useTripRoutes';
import TripRoutesComponent from './TripRoutesComponent';

const TripRoutes = () => {
  const {
    routesData,
    handleRoutesChange,
    selectedRoute,
    directionsData,
    handleDirectionChange,
    selectedDirection,
    stopsData,
    areStopsFetching,
  } = useTripRoutes();

  return (
    <TripRoutesComponent
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

export default TripRoutes;
