import connect from "../config/db.js";
import Booking from "../model/booking.js";
import Service from "../model/service.js";
import Transaction from "../model/transaction.js";


export default class TransactionController {
    static async completedBooking(req, res) {
        const t = await connect.transaction()

        try {
            const { payment_method } = req.body
            const bookingId = req.params.id

            if (!payment_method) {
                await t.rollback()
                return res.status(400).json({ message: "Metode pembayaran wajib diisi" })
            }

            const booking = await Booking.findByPk(bookingId, {
                include: [{ model: Service }],
                transaction: t,
                lock: t.LOCK.UPDATE
            })

            if (!booking) {
                await t.rollback()
                return res.status(400).json({ message: "Booking tidak tersedia" })
            }

            if (booking.status === "completed") {
                await t.rollback()
                return res.status(400).json({ message: "Booking telah diselesaikan" })
            }

            const service = booking.Service

            const completedBook = await Transaction.create({
                booking_id: booking.id,
                name: service.name,
                price: service.price,
                payment_method
            }, { transaction: t })

            booking.status = "completed"
            await booking.save({ transaction: t })
            
            await t.commit()
            return res.status(201).json({ message: "Booking selesai", data: completedBook })
            
        } catch (error) {
            await t.rollback()
            console.error(error)
            return res.status(500).json({ message: "Booking gagal selesai" })
        }
    }

    static async getTransaction(req, res) {
        const getTrns = await Transaction.findAll({
            order: [["createdAt", "DESC"]]
        })

        return res.json(getTrns)
    }
}