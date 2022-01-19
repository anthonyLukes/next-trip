import { useEffect, useMemo, useState } from 'react';
import { getDirections, getRoutes, getStops } from '../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import get from 'lodash/get';

function useNextTrip() {
  // url params
  const history = useHistory();
  const { route: urlRoute, direction: urlDirection } = useParams();

  // Get routes
  const { data: routes, isFetching: areRoutesFetching, error: routesError } = useQuery(
    'routes',
    () => getRoutes('routes')
  );
  const routesData = get(routes, 'data');
  const routesErrorMessage = get(routesError, 'message');

  // Selected Route
  const [selectedRoute, setSelectedRoute] = useState('');
  // Selected Direction
  const [selectedDirection, setSelectedDirection] = useState('');

  // Get directions
  const shouldFetchDirections = Boolean(!areRoutesFetching && selectedRoute);
  const { data: directions, isFetching: areDirectionsFetching, error: directionsError } = useQuery(
    ['directions', selectedRoute],
    () => getDirections(selectedRoute),
    {
      enabled: shouldFetchDirections,
    }
  );
  const directionsData = get(directions, 'data');
  const directionsErrorMessage = get(directionsError, 'message');

  // Get stops
  const shouldFetchStops = Boolean(
    !areRoutesFetching &&
      selectedRoute &&
      !areDirectionsFetching &&
      selectedDirection
  );
  const { data: stops, isFetching: areStopsFetching, error: stopsError } = useQuery(
    ['stops', selectedRoute, selectedDirection],
    () => getStops(selectedRoute, selectedDirection),
    {
      enabled: shouldFetchStops,
    }
  );
  const stopsData = get(stops, 'data')
  const stopsErrorMessage = get(stopsError, 'message')

  const handleRoutesChange = (event) => {
    const value = get(event, 'target.value');

    // clear directions when route changes
    setSelectedDirection('');
    // change url
    if (value && value !== urlRoute) {
      history.push(`/${value}`);
    }

    setSelectedRoute(value);
  };

  const handleDirectionChange = (event) => {
    const value = get(event, 'target.value');
    setSelectedDirection(value);
    // change url
    if (value) {
      history.push(`/${selectedRoute}/${value}`);
    }
  };

  const isValidRoute = useMemo(() => {
    return Boolean(
      routesData &&
        routesData.filter((route) => {
          const id = get(route, 'Route');
          return id === urlRoute;
        }).length
    );
  }, [routesData, urlRoute]);

  const isValidDirection = useMemo(() => {
    return Boolean(
      directionsData &&
        directionsData.filter((direction) => {
          const id = get(direction, 'Value');
          return id === urlDirection;
        }).length
    );
  }, [directionsData, urlDirection]);

  // change selectedRoute when route segment changes
  useEffect(() => {
    if (routesData && routesData.length) {
      if (isValidRoute) {
        if (selectedRoute !== urlRoute) {
          setSelectedRoute(urlRoute);
        }
      } else {
        setSelectedRoute('');
      }
    }
  }, [routesData, urlRoute, isValidRoute]);

  // change selectedDirection when direction segment changes
  useEffect(() => {
    if (directionsData && directionsData.length) {
      if (isValidDirection) {
        if (selectedDirection !== urlDirection) {
          setSelectedDirection(urlDirection);
        }
      } else {
        setSelectedDirection('');
      }
    }
  }, [directionsData, urlDirection, isValidDirection]);

  return {
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
  };
}

export default useNextTrip;
