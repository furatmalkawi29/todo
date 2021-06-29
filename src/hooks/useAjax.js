
import axios from "axios";

export default function useAjax() {

async function hitApi (method,url,data,options){
  let response = await axios({
    method: method,
    url: url,
    data: data,
    ...options
  });
return await response.data;

}


  return (
    [hitApi]
  )
}
