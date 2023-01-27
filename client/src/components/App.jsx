import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashBoard = (
    <SocketProvider id={id}>
      <ContactsProvider id={id}>
        <Dashboard id={id} />
      </ContactsProvider>
    </SocketProvider>
  )
  return (
    id ? dashBoard : <Login onIdSubmit={setId} />
  )
}

export default App
