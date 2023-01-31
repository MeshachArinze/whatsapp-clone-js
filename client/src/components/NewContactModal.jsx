import React, { useRef } from 'react'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  function handleSubmit(e) {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)
    closeModal()
  }

  return (
    <>
      <header closeButton>Create Contact</header>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Id</label>
            <input type="text" ref={idRef} required />
          </div>
          <div>
            <label>Name</label>
            <input type="text" ref={nameRef} required />
          </div>
          <button type="submit">Create</button>
        </form>
      </section>
    </>
  )
}
