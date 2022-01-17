import * as React from 'react';
import classes from './styles.module.css';

const Header = () => {
  return (
    <header data-testid="header" className={classes.header}>
      <h1>Metro Transit - Next Trip</h1>
    </header>
  );
};

export default Header;
