import Select from '../../components/select';
import classes from './styles.module.css';
import formatRoutes from '../../utils/formatRoutes';
import formatDirections from '../../utils/formatDirections';

const TripRoutesComponent = (props) => {
  const {
    routesData,
    handleRoutesChange,
    selectedRoute,
    directionsData,
    handleDirectionChange,
    selectedDirection,
    stopsData,
    areStopsFetching,
  } = props;

  return (
    <div data-testid="trip-routes" className={classes.container}>
      <div className={classes.container__section}>
        <Select
          label="Routes"
          id="routes"
          onChange={handleRoutesChange}
          options={formatRoutes(routesData)}
          value={selectedRoute}
          placeholder="Select a Route"
        />
      </div>
      {directionsData && directionsData.length > 0 && (
        <div className={classes.container__section}>
          <Select
            label="Direction"
            id="direction"
            onChange={handleDirectionChange}
            options={formatDirections(directionsData)}
            value={selectedDirection}
            placeholder="Select a Direction"
          />
        </div>
      )}
      <div className={classes.container__section}>
        {stopsData && stopsData.length > 0 ? (
          <>
            <h2>Stops</h2>
            <ol
              data-testid="stops-list"
              data-testid="stops-list"
              className={classes.list}
            >
              {stopsData.map((stop) => (
                <li
                  data-testid={stop.Value}
                  className={classes.list__item}
                  key={stop.Value}
                >
                  {stop.Text}
                </li>
              ))}
            </ol>
          </>
        ) : null}
        {areStopsFetching && <div>Loading Stops...</div>}
      </div>
    </div>
  );
};

export default TripRoutesComponent;
