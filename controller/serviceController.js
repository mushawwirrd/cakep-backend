import { where } from "sequelize"
import Service from "../model/service.js"

export default class ServiceController {
    static async addService(req, res) {
        const { name, price, duration, status } = req.body

        const { originalName, mimetype, filename } = req.file

        const filePath = `/uploads/${filename}`

        const tambah = await Service.create({
            originalName: originalName,
            mimeType: mimetype,
            filePath,
            name,
            price,
            duration,
            status
        })

        return res.json(tambah)

    }

    static async getService(req, res) {
        const getServ = await Service.findAll()

        return res.json(getServ)
    }

    static async oneService(req, res) {
        const serviceId = req.params.id

        const one = await Service.findOne({ where: { id: serviceId } })

        return res.json(one)
    }

    static async editService(req, res) {
        const { name, price, duration, status } = req.body

        const { originalName, mimetype, filename } = req.file

        const filePath = `/uploads/${filename}`

        const serviceId = req.params.id

        const edit = await Service.update({
            originalName: originalName,
            mimeType: mimetype,
            filePath,
            name,
            price,
            duration,
            status
        }, { where: { id: serviceId } })

        return res.json(edit)

    }

    static async dltService(req, res) {
        const serviceId = req.params.id

        const dlt = await Service.destroy({ where: { id: serviceId } })
    }

}