import { useState } from 'react';
import { Navbar } from './Components/Navbar';
import { Users } from './Users';


function App() {
  const [newUserModel, setNewUserModel] = useState(true);



  return (
    <>
      <Navbar />
      <Users />
    </>
  );
}

export default App;
