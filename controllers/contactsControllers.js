import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContactsCtrl = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
};

const getOneContactCtrl = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
};

const deleteContactCtrl = async (req, res) => {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);

    if (!deletedContact) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(deletedContact);
};

const createContactCtrl = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(name, email, phone);

    res.status(201).json(newContact);
};

const updateContactCtrl = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (Object.keys(body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }

    const updatedContact = await contactsService.updateContact(id, body);

    if (!updatedContact) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
};

export const getAllContacts = ctrlWrapper(getAllContactsCtrl);
export const getOneContact = ctrlWrapper(getOneContactCtrl);
export const deleteContact = ctrlWrapper(deleteContactCtrl);
export const createContact = ctrlWrapper(createContactCtrl);
export const updateContact = ctrlWrapper(updateContactCtrl);