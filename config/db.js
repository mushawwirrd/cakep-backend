import { Sequelize } from "sequelize";


const connect = new Sequelize("cakepp", "root", "071Januarii!", {
    host: "localhost",
    dialect: "mysql"
})

export default connect