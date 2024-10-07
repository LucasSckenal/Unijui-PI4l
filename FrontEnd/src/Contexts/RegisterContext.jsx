import { createContext, useState } from "react";

export const RegisterContext = createContext();

// Photo, Name, Email, Password

export const RegisterProvider({children}) => {    

    const [photo, SetPhoto] = useState(null);
    const [name, SetName] = useState(''); 
    const [email, SetEmail] = useState(''); 
    const [password, SetPassword] = useState(''); 

  return <>
  
  </>;
}
