import React, { useState } from 'react';


export const SettingsContext = React.createContext();


const SettingsProvider = (props) => {
  const [incomplete, setIncomplete] = useState(false);
  const [taskNumber, setTaskNumber] = useState(0);

  const stateDetails = {
    incomplete,
    showIncomplete: setIncomplete,
    taskNumber,
    setTaskNumber
  }

  {console.log(taskNumber)}
  return (
      <SettingsContext.Provider value={stateDetails}>
          {props.children}
      </SettingsContext.Provider>
  );
}

export default SettingsProvider;