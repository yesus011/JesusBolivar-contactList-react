const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            urlBase: "https://playground.4geeks.com/contact/",
            contacts: []
        },
        actions: {
            // Fetch all contacts
            getAllContacts: async () => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}agendas/JesusBolivar/contacts`);
                    if (response.status === 404) {
                        await getActions().createAgenda();
                    } else if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts });
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },

            // Save a new contact
            saveContact: async (contact) => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}agendas/JesusBolivar/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().getAllContacts();
                        return true;
                    }
                } catch (error) {
                    console.error("Error saving contact:", error);
                }
            },

            // Delete a contact by ID
            deleteContact: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}agendas/JesusBolivar/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await getActions().getAllContacts();
                    }
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            },

            // Create a new agenda
            createAgenda: async () => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}agendas/JesusBolivar`, {
                        method: "POST"
                    });
                    if (response.ok) {
                        console.log("User created");
                        await getActions().getAllContacts();
                    }
                } catch (error) {
                    console.error("Error creating agenda:", error);
                }
            },

            // Update a contact by ID
            updateContact: async (id, contact) => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}agendas/JesusBolivar/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().getAllContacts();
                        return true;
                    }
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            }
        }
    };
};

export default getState;
