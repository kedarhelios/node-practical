import defineUser from "./user.model";
import defineProduct from "./product.model";
import sequelizeConnection from "../database/database";

const User = defineUser(sequelizeConnection);
const Product = defineProduct(sequelizeConnection);

User.hasMany(Product, { foreignKey: "created_by" });
Product.belongsTo(User, { foreignKey: "created_by" });

(async () => {
    try {
        await sequelizeConnection.authenticate();
        await sequelizeConnection.sync({ force: false });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

export { User, Product };
