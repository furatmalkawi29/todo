import React from 'react';

import ToDo from './components/todo/todo-connected';
import SettingsProvider  from './context/settings-context.js';

    

const App = () => {
  return (    
  <>
  <SettingsProvider>
    <ToDo />
</SettingsProvider>
  </> );
}
 
export default App;

