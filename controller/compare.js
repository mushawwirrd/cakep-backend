import { Sequelize } from "sequelize";
import Booking from "../model/booking";
import Service from "../model/service";

 const favoriteService = await Booking.findAll({
            attributes: [
                "service_id"
                [Sequelize.fn("COUNT", Sequelize.col("service_id")), "total"]
            ],
            group: ["service_id"],
            include: [{ model: Service, attributes: ["name"] }],
            order: [[Sequelize.literal("total"), "DESC"]],
            limit: 1
        })
