import { useState } from 'react';

function useForm(propsHandleSubmit) {

  const [item, setItem] = useState({}) ;

const handleInputChange = e => {
    setItem( {...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    propsHandleSubmit(item);
    const myItem = {};
    setItem(myItem);
  };

  return (
   [
    item,
    setItem,
    handleInputChange,
    handleSubmit
   ]
  )
}

export default useForm;
