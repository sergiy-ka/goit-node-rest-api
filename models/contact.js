import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Contact = sequelize.define(
    'Contact',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        tableName: 'contacts'
    }
);

Contact.belongsTo(User, { foreignKey: 'owner' });
User.hasMany(Contact, { foreignKey: 'owner' });

export default Contact;