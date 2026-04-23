import { Sequelize } from "sequelize";
import Booking from "../model/booking.js";
import Transaction from "../model/transaction.js";
import Service from "../model/service.js";

export default class DashboardController {
    static async analytic(req, res) {
        const totalRevenue = await Transaction.sum("price")

        const favoriteService = await Booking.findAll({
            attributes: [
                "service_id",
                [Sequelize.fn("COUNT", Sequelize.col("service_id")), "total"]
            ],
            group: ["service_id"],
            include: [{ model: Service, attributes: ["name"] }],
            order: [[Sequelize.literal("total"), "DESC"]],
            limit: 1
        })

        const jamRamai = await Booking.findAll({
            attributes: [
                [Sequelize.fn("HOUR", Sequelize.col("booking_time")), "hour"],
                [Sequelize.fn("COUNT", Sequelize.col("id")), "total"]
            ],
            group: ["hour"],
            order: [[Sequelize.literal("total"), "DESC"]],
            limit: 1
        })

        const hariRamai = await Booking.findAll({
            attributes: [
                [Sequelize.fn("DAYNAME", Sequelize.col("booking_date")), "day"],
                [Sequelize.fn("COUNT", Sequelize.col("id")), "total"]
            ],
            group: ["day"],
            order: [[Sequelize.literal("total"), "DESC"]],
            limit: 1
        })

        return res.json({
            totalRevenue: totalRevenue || 0,
            favoriteService: favoriteService[0] || null,
            jamRamai: jamRamai[0] || null,
            hariRamai: hariRamai[0] || null
        })

    }
}