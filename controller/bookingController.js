import connect from "../config/db.js";
import Booking from "../model/booking.js";
import Customer from "../model/customer.js";
import Service from "../model/service.js";

export default class BookingController {
    static async onlineBooking(req, res) {
        const t = await connect.transaction()

        try {
            const { booking_date, booking_time, service_id } = req.body
            const customer_id = req.userId

            if (!booking_date || !booking_time || !service_id) {
                await t.rollback()
                return res.status(400).json({ message: "Data belum lengkap" })
            }

            const service = await Service.findByPk(service_id, { transaction: t })

            if (!service || service.status !== "active") {
                await t.rollback()
                return res.status(400).json({ message: "Layanan tidak tersedia" })
            }

            const conflict = await Booking.findOne({
                where: {
                    booking_date,
                    booking_time,
                    status: "booked"
                },
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (conflict) {
                await t.rollback()
                return res.status(400).json({ message: "Jadwal tidak tersedia" })
            }

            const onlineBook = await Booking.create({
                booking_date,
                booking_time,
                service_id,
                customer_id,
                source: "online"
            })

            await t.commit()
            return res.status(201).json({ message: "Booking online berhasil dibuat", book: onlineBook })

        } catch (error) {
            await t.rollback()
            console.error(error)
            return res.status(500).json({ message: "Booking online gagal dibuat" })
        }
    }

    static async onsiteBooking(req, res) {
        const t = await connect.transaction()

        try {
            const { username, phone, booking_date, booking_time, service_id } = req.body
            const customer_id = req.userId

            if (!username || !phone || !booking_time || !booking_date || !service_id) {
                await t.rollback()
                return res.status(400).json({ message: "Data belum lengkap" })
            }

            const service = await Service.findByPk(service_id, { transaction: t })

            if (!service || service.status !== "active") {
                await t.rollback()
                return res.status(400).json({ message: "Layanan tidak tersedia" })
            }

            const conflict = await Booking.findOne({
                where: {
                    booking_time,
                    booking_date,
                    status: "booked"
                },
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (conflict) {
                await t.rollback()
                return res.status(400).json({ message: "Jadwal tidak tersedia" })
            }

            let customer = await Customer.findOne({ where: { phone }, transaction: t })

            if (!customer) {
                customer = await Customer.create({ username, phone }, { transaction: t })
            }

            const onsiteBook = await Booking.create({
                booking_date,
                booking_time,
                service_id,
                customer_id,
                source: "onsite"
            }, { transaction: t })

            await t.commit()
            return res.status(201).json({ message: "Booking onsite berhasil dibuat", book: onsiteBook })

        } catch (error) {
            await t.rollback()
            return res.status(500).json({ message: "Booking onsite gagal dibuat" })
        }
    }
    static async getBooking(req, res) {
        const getBook = await Booking.findAll({
            include: [{ model: Service }],
            order: [
                ["booking_date", "ASC"],
                ["booking_time", "ASC"]
            ]
        })

        return res.json(getBook)
    }
}