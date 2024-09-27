import { useState } from "react";

function RegisterForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = (e) => {
     e.preventDefault();
    
     console.log("Registered:", { name, email, password });
   };

   return (
     <form onSubmit={handleSubmit}>
       <label>
         Name:
         <input
           type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
         />
       </label>
       <br />
       <label>
         Email:
         <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
       </label>
       <br />
       <label>
         Password:
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
       </label>
       <br />
       <button type="submit">Register</button>
     </form>
   );
}

export default RegisterForm;
