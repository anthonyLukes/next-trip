import useTripRoutes from "./useTripRoutes";
import Select from '../../components/select';
import classes from './styles.module.css'

const TripRoutes = () => {
  
  const { routesData, handleRoutesChange, selectedRoute, directionsData, handleDirectionChange, selectedDirection } = useTripRoutes()
  
  return (<div className={classes.container}>
    <div className={classes.container__section}>
      <Select label="Routes" id="routes" onChange={handleRoutesChange} options={routesData} value={selectedRoute} placeholder="Select a Route" />
    </div>
    {selectedRoute && (
      <div className={classes.container__section}>
        <Select label="Direction" id="direction" onChange={handleDirectionChange} options={directionsData} value={selectedDirection} placeholder="Select a Direction" />
      </div>
    )}
  </div>);
}
 
export default TripRoutes;
