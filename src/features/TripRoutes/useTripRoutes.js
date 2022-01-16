import { useState } from 'react';
import { getDirections, getRoutes } from '../../api';
import { useQuery } from 'react-query'
import formatRoutes from '../../utils/formatRoutes';
import get from 'lodash/get'
import formatDirections from '../../utils/formatDirections';

function useNextTrip() {
  // Get routes
  const { data: routesData, isFetching: areRoutesFetching } = useQuery('routes', () => getRoutes('routes'))

  // Selected Route
  const [selectedRoute, setSelectedRoute] = useState();
  // Selected Direction
  const [selectedDirection, setSelectedDirection] = useState();

  // Get directions
  const shouldFetchDirections = Boolean(!areRoutesFetching && selectedRoute)
  const { data: directionsData } = useQuery(['directions', selectedRoute], () => getDirections(selectedRoute), {
    // The query will not execute until the userId exists
    enabled: shouldFetchDirections,
  })

  const handleRoutesChange = (event) => {
    const value = get(event, 'target.value')
    setSelectedRoute(value);
    // clear directions when route changes
    setSelectedDirection('');
  }

  const handleDirectionChange = (event) => {
    const value = get(event, 'target.value')
    setSelectedDirection(value);
  }

  return {
    routesData: formatRoutes(routesData),
    handleRoutesChange,
    selectedRoute,
    directionsData: formatDirections(directionsData),
    handleDirectionChange,
    selectedDirection,
  };
}

export default useNextTrip
