import useTripRoutes from "./useTripRoutes";
import Select from '../../components/select';
import classes from './styles.module.css'
import formatRoutes from "../../utils/formatRoutes";
import formatDirections from "../../utils/formatDirections";

const TripRoutes = () => {
  
  const { routesData, handleRoutesChange, selectedRoute, directionsData, handleDirectionChange, selectedDirection, stopsData, areStopsFetching } = useTripRoutes()
  
  return (<div className={classes.container}>
    <div className={classes.container__section}>
      <Select label="Routes" id="routes" onChange={handleRoutesChange} options={formatRoutes(routesData)} value={selectedRoute} placeholder="Select a Route" />
    </div>
    {selectedRoute && (
      <div className={classes.container__section}>
        <Select label="Direction" id="direction" onChange={handleDirectionChange} options={formatDirections(directionsData)} value={selectedDirection} placeholder="Select a Direction" />
      </div>
    )}
    <div className={classes.container__section}>
      {stopsData && stopsData.length > 0 ? (<ul>{stopsData.map(stop => (
        <li key={stop.Value}>{stop.Text}</li>
      ))}</ul>) : null}
      {areStopsFetching && <div>Loading Stops...</div>}
    </div>
  </div>);
}
 
export default TripRoutes;
