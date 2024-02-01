import { useState } from 'react';
import MyPhonebook from './MyPhonebook/PhonebookForm/MyPhonebook';


const App = () => {

const [contacts, setContacts] = useState([]);
const [name, setName] = useState('');

return (
  <>
  <MyPhonebook/>
  </>
)
}

export default App;