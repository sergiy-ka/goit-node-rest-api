import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContactsCtrl = async (req, res) => {
    const { id: owner } = req.user;
    const contacts = await contactsService.listContacts(owner);
    res.status(200).json(contacts);
};

const getOneContactCtrl = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const contact = await contactsService.getContactById(id, owner);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
};

const deleteContactCtrl = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const deletedContact = await contactsService.removeContact(id, owner);
    if (!deletedContact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(deletedContact);
};

const createContactCtrl = async (req, res) => {
    const { name, email, phone } = req.body;
    const { id: owner } = req.user;
    const newContact = await contactsService.addContact(name, email, phone, owner);
    res.status(201).json(newContact);
};

const updateContactCtrl = async (req, res) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const body = req.body;
    if (Object.keys(body).length === 0) {
        throw HttpError(400, "Body must have at least one field");
    }
    const updatedContact = await contactsService.updateContact(id, body, owner);
    if (!updatedContact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(updatedContact);
};

const updateStatusContactCtrl = async (req, res) => {
    const { contactId } = req.params;
    const { id: owner } = req.user;
    const body = req.body;
    const updatedContact = await contactsService.updateContactStatus(contactId, body, owner);
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
export const updateStatusContact = ctrlWrapper(updateStatusContactCtrl);