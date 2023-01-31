import Login from "../src/components/Login";
import useLocalStorage from "../src/hooks/useLocalStorage";
import Dashboard from "../src/components/Dashboard";
import { ContactsProvider } from "../src/contexts/ContactsProvider";
import { ConversationsProvider } from "../src/contexts/ConversationsProvider";
import { SocketProvider } from "../src/contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
