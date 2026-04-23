import { DataTypes } from "sequelize";
import connect from "../config/db.js";


const Admin = connect.define("Admin", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
    
}, {
    timestamps: false,
    tableName: "admin"
})

export default Admin