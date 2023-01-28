import React, { useContext, useState, useEffect, useCallback, createContext, createContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts} from "../contexts/ContactsProvider";
import { useSocket } from './SocketProvider';

const ConversationContext = createContext();

const ConversationsProvider = () => {
  return (
    <div>ConversationsProvider</div>
  )
}

export default ConversationsProvider