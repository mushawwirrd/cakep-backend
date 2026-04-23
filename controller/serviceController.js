import Service from "../model/service.js"

export default class ServiceController {
    static async addService(req, res) {
        const { name, price, duration, status } = req.body

        const service = await Service.create({  name, price, duration, status })

        return res.json(service)

    }

    static async getService(req, res) {
        const getServ = await Service.findAll()

        return res.json(getServ)
    }
}