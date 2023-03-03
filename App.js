import React from 'react';

import Providers from './src/navigation';
// why is routes causing render error?
import Routes from './src/navigation/routes';

export default function App() {
  return <Providers />;
}
