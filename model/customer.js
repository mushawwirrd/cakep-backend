import { DataTypes } from "sequelize";
import connect from "../config/db.js";


const Customer = connect.define("Customer", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING
}, {
    timestamps: false,
    tableName: "customer"
})

export default Customer