import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';

const Main = () => {
  return (
    <Switch>
      <Route path="/gallery" component={Gallery} />
      {/* Add other routes as needed */}
    </Switch>
  );
}

export default Main;
