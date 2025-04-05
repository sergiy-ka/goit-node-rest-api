import Contact from '../models/contact.js';

export async function listContacts() {
    try {
        const contacts = await Contact.findAll();
        return contacts;
    } catch (error) {
        console.error('Error reading contacts:', error.message);
        throw error;
    }
}

export async function getContactById(contactId) {
    try {
        const contact = await Contact.findByPk(contactId);
        return contact;
    } catch (error) {
        console.error('Error getting contact by ID:', error.message);
        throw error;
    }
}

export async function removeContact(contactId) {
    try {
        const contact = await Contact.findByPk(contactId);

        if (!contact) {
            return null;
        }

        await contact.destroy();
        return contact;
    } catch (error) {
        console.error('Error removing contact:', error.message);
        throw error;
    }
}

export async function addContact(name, email, phone) {
    try {
        const newContact = await Contact.create({
            name,
            email,
            phone,
        });

        return newContact;
    } catch (error) {
        console.error('Error adding contact:', error.message);
        throw error;
    }
}

export async function updateContact(contactId, data) {
    try {
        const contact = await Contact.findByPk(contactId);

        if (!contact) {
            return null;
        }

        await contact.update(data);

        return contact;
    } catch (error) {
        console.error('Error updating contact:', error.message);
        throw error;
    }
}

export async function updateContactStatus(contactId, { favorite }) {
    try {
        const contact = await Contact.findByPk(contactId);

        if (!contact) {
            return null;
        }

        await contact.update({ favorite });

        return contact;
    } catch (error) {
        console.error('Error updating contact status:', error.message);
        throw error;
    }
}