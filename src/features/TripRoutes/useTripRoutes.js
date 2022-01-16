import { useState } from 'react';
import { getDirections, getRoutes } from '../../api';
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from 'react-query'
import formatRoutes from '../../utils/formatRoutes';
import get from 'lodash/get'
import formatDirections from '../../utils/formatDirections';

function useNextTrip() {
  const history = useHistory()
  // Get routes
  const { data: routesData, isFetching: areRoutesFetching } = useQuery('routes', () => getRoutes('routes'))

  // Selected Route
  const [selectedRoute, setSelectedRoute] = useState('');
  // Selected Direction
  const [selectedDirection, setSelectedDirection] = useState('');

  // Get directions
  const shouldFetchDirections = Boolean(!areRoutesFetching && selectedRoute)
  const { data: directionsData, isFetching: areDirectionsFetching } = useQuery(['directions', selectedRoute], () => getDirections(selectedRoute), {
    // The query will not execute until the userId exists
    enabled: shouldFetchDirections,
  })

  const handleRoutesChange = (event) => {
    const value = get(event, 'target.value')
    setSelectedRoute(value);
    // clear directions when route changes
    setSelectedDirection('');
    // change url
    history.push(`/${value}`)
  }

  const handleDirectionChange = (event) => {
    const value = get(event, 'target.value')
    setSelectedDirection(value);
    // change url
    history.push(`/${selectedRoute}/${value}`)
  }

  // handle url route changes
  const { route: urlRoute, direction: urlDirection } = useParams();
  
  // if url route doesn't match selected
  // and routes aren't fetching
  if (urlRoute !== selectedRoute && !areRoutesFetching) {
    const isValidRoute = Boolean(routesData.filter(route => {
      const id = get(route, 'Route');
      return id === urlRoute
    }).length)
    // if urlRoute is a fetched route
    if (isValidRoute) {
      // then set selectedRoute
      setSelectedRoute(urlRoute);
    }
  }

  // if there is direction data
  // url direction doesn't match selected
  // routes aren't fetching
  // and directions aren't fetching
  if (directionsData && urlDirection !== selectedDirection && !areRoutesFetching && !areDirectionsFetching) {
    const isValidDirection = Boolean(directionsData.filter(direction => {
      const id = get(direction, 'Value');
      return id === urlDirection
    }).length)
    // if urlDirection is a fetched direction
    if (isValidDirection) {
      // then set selectedRoute
      setSelectedDirection(urlDirection);
    }
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
