import { Sequelize } from "sequelize";

import Booking from "../model/booking.js";
import Customer from "../model/customer.js";
import Transaction from "../model/transaction.js";
import Service from "../model/service.js";


export default class CrmController {
    static async customer(req, res) {

        const getCust = await Customer.findAll({ attributes: ["id", "username", "email", "phone"] })

        return res.json(getCust)

    }

    static async detail(req, res) {
        const { id } = req.params

        const totalBooking = await Booking.count({ where: { customer_id: id } })

        const totalSpent = await Transaction.sum("price", {
            include: [{
                model: Booking,
                where: { customer_id: id },
                attributes: []
            }]
        })

        const favoriteService = await Booking.findOne({
            attributes: [
                "service_id",
                [Sequelize.fn("COUNT", Sequelize.col("service_id")), "total"]
            ],
            group: ["service_id"],
            where: { customer_id: id },
            include: [{ model: Service, attributes: ["name"] }],
            order: [[Sequelize.literal("total"), "DESC"]],
            limit: 1
        })

        const lastVisit = await Booking.max("booking_date", { where: { customer_id: id } })

        return res.json({
            totalBooking,
            totalSpent: totalSpent || 0,
            favoriteService,
            lastVisit,
            //favoriteService: favoriteService[0] || null,
        })

    }
}