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
  const { data: routesData, isFetching: areRoutesFetching } = useQuery(
    'routes',
    () => getRoutes('routes')
  );

  // Selected Route
  const [selectedRoute, setSelectedRoute] = useState('');
  // Selected Direction
  const [selectedDirection, setSelectedDirection] = useState('');

  // Get directions
  const shouldFetchDirections = Boolean(!areRoutesFetching && selectedRoute);
  const { data: directionsData, isFetching: areDirectionsFetching } = useQuery(
    ['directions', selectedRoute],
    () => getDirections(selectedRoute),
    {
      enabled: shouldFetchDirections,
    }
  );

  // Get stops
  const shouldFetchStops = Boolean(
    !areRoutesFetching &&
      selectedRoute &&
      !areDirectionsFetching &&
      selectedDirection
  );
  const { data: stopsData, isFetching: areStopsFetching } = useQuery(
    ['stops', selectedRoute, selectedDirection],
    () => getStops(selectedRoute, selectedDirection),
    {
      enabled: shouldFetchStops,
    }
  );

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
  }, [routesData, urlRoute]);

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
  }, [directionsData, urlDirection]);

  return {
    routesData,
    handleRoutesChange,
    selectedRoute,
    directionsData,
    handleDirectionChange,
    selectedDirection,
    stopsData,
    areStopsFetching,
  };
}

export default useNextTrip;
