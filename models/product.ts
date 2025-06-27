import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

interface ProductModel
    extends Model<
        InferAttributes<ProductModel>,
        InferCreationAttributes<ProductModel>
    > {
    id: CreationOptional<number>;
    name: string;
    product_number: string;
    price?: number;
    created_at: CreationOptional<Date>;
    updated_at: CreationOptional<Date>;
    created_by?: number;
    updated_by?: number;
}

export default (sequelize: Sequelize) => {
    const Product = sequelize.define<ProductModel>(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true, len: [6, 255] },
            },
            product_number: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                    len: [6, 255],
                    isNumeric: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER,
        },
        {
            timestamps: false,
        }
    );

    return Product;
};
