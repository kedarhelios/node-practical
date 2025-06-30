import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

export interface ProductModel
    extends Model<
        InferAttributes<ProductModel>,
        InferCreationAttributes<ProductModel>
    > {
    id: CreationOptional<number>;
    name: string;
    product_number: number;
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
                validate: { notEmpty: true },
            },
            product_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                    isNumeric: true,
                },
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
