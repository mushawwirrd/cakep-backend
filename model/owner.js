import { DataTypes } from "sequelize";
import connect from "../config/db.js";


const Owner = connect.define("Owner", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING

}, {
    timestamps: false,
    tableName: "owner"
})

export default Owner