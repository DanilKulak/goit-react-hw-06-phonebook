import { List, ListItem, DeleteButton } from './PhonebookList.styled';


const PhonebookList = ({ items, deleteContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <ListItem key={id}>
      Name: {name}. Number: {number}. <DeleteButton onClick={() => deleteContact(id)} type="button">Delete</DeleteButton>
    </ListItem>
  ));
  return (
    <div>
      <h2>Contacts</h2>
      <List>{elements}</List>
    </div>
  );
};

export default PhonebookList;
