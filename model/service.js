import { DataTypes } from "sequelize";
import connect from "../config/db.js";

const Service = connect.define("Service", {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING,

    originalName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    mimeType: DataTypes.STRING,


}, {
    tableName: "service",
    timestamps: false
})

export default Service