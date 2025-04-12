import Contact from '../models/contact.js';

export async function listContacts(userId) {
    try {
        const contacts = await Contact.findAll({
            where: { owner: userId }
        });
        return contacts;
    } catch (error) {
        console.error('Error reading contacts:', error.message);
        throw error;
    }
}

export async function getContactById(contactId, userId) {
    try {
        const contact = await Contact.findOne({
            where: {
                id: contactId,
                owner: userId
            }
        });
        return contact;
    } catch (error) {
        console.error('Error getting contact by ID:', error.message);
        throw error;
    }
}

export async function removeContact(contactId, userId) {
    try {
        const contact = await Contact.findOne({
            where: {
                id: contactId,
                owner: userId
            }
        });
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

export async function addContact(name, email, phone, userId) {
    try {
        const newContact = await Contact.create({
            name,
            email,
            phone,
            owner: userId
        });
        return newContact;
    } catch (error) {
        console.error('Error adding contact:', error.message);
        throw error;
    }
}

export async function updateContact(contactId, data, userId) {
    try {
        const contact = await Contact.findOne({
            where: {
                id: contactId,
                owner: userId
            }
        });
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

export async function updateContactStatus(contactId, { favorite }, userId) {
    try {
        const contact = await Contact.findOne({
            where: {
                id: contactId,
                owner: userId
            }
        });
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