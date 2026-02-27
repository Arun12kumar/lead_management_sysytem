import {DataTypes,Model} from 'sequelize'
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js';

export class User extends Model{
    async comparePassword(plainPassword){
        return bcrypt.compare(plainPassword, this.password);
    }
}

User.init(
    {
        id:{
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(150),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(225),
            allowNull:false,
            unique:true,
            validate:{isEmail:true}
        },
        password:{
            type:DataTypes.STRING(225),
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM('admin','agent','manager'),
            defaultValue:'agent'
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName:'User',
        tableName:'users',
        underscored:true,
        timestamps:true,
        hooks:{
            beforeCreate: async(user)=>{
                if(user.password){
                    user.password = await bcrypt.hash(user.password,12);
                }
            },
            beforeUpdate: async(user)=>{
                if(user.changed('password')){
                    user.password = await bcrypt.hash(user.password,12);
                }
            },
        }
    }
)

export default User;