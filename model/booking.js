import { DataTypes } from "sequelize";
import connect from "../config/db.js";
import Customer from "./customer.js";
import Service from "./service.js";


const Booking = connect.define("Booking", {
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: "id"
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: "id"
        }
    },

    booking_date: DataTypes.DATE,
    booking_time: DataTypes.TIME,
    source: DataTypes.STRING,
    status: DataTypes.STRING

}, {
    timestamps: false,
    tableName: "booking"
})

Booking.belongsTo(Customer, { foreignKey: "customer_id" })
Booking.belongsTo(Service, { foreignKey: "service_id" })

export default Booking