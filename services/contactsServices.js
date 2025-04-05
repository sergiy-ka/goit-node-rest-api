import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading contacts:", error.message);
        return [];
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((item) => item.id === contactId);
        return contact || null;
    } catch (error) {
        console.error("Error getting contact by ID:", error.message);
        return null;
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex((item) => item.id === contactId);

        if (contactIndex === -1) {
            return null;
        }

        const [removedContact] = contacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return removedContact;
    } catch (error) {
        console.error("Error removing contact:", error.message);
        return null;
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };

        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
    } catch (error) {
        console.error("Error adding contact:", error.message);
        return null;
    }
}

async function updateContact(contactId, data) {
    try {
        const contacts = await listContacts();
        const contactIndex = contacts.findIndex((item) => item.id === contactId);

        if (contactIndex === -1) {
            return null;
        }

        const updatedContact = { ...contacts[contactIndex], ...data };
        contacts[contactIndex] = updatedContact;

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return updatedContact;
    } catch (error) {
        console.error("Error updating contact:", error.message);
        return null;
    }
}

export { listContacts, getContactById, removeContact, addContact, updateContact };