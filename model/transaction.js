import { DataTypes } from "sequelize";
import connect from "../config/db.js";
import Booking from "./booking.js";

const Transaction = connect.define("Transaction", {
    booking_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Booking,
            key: "id"
        }
    },

    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    payment_method: DataTypes.INTEGER

}, {
    timestamps: true,
    tableName: "transaction"
})

Transaction.belongsTo(Booking, { foreignKey: "booking_id" })

export default Transaction