import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import bcrypt from "bcrypt";

interface UserModel
    extends Model<
        InferAttributes<UserModel>,
        InferCreationAttributes<UserModel>
    > {
    id: CreationOptional<number>;
    name: string;
    username: string;
    password: string;
    created_at: CreationOptional<Date>;
    updated_at: CreationOptional<Date>;
    created_by?: number;
    updated_by?: number;
}

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserModel>(
        "User",
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
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { notEmpty: true },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
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
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await bcrypt.hash(user.password, 10);
                },
                beforeUpdate: async (user) => {
                    if (user.changed("password")) {
                        user.password = await bcrypt.hash(user.password, 10);
                    }
                    user.updated_at = new Date();
                },
            },
        }
    );

    return User;
};
