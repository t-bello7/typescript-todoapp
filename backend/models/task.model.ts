import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../config/db.config';

interface TaskAttributes {
	id: number;
	todoText: string;
	isComplete: Boolean;
	isArchived: Boolean;
}

export interface TaskInput extends Optional<TaskAttributes, 'id'>{}
export interface TaskOutput extends Required<TaskAttributes> {}

class Task extends Model<TaskInput, TaskOutput>implements TaskAttributes {
	public id!: number
	public todoText: string
	public isComplete: Boolean
	public isArchived: Boolean;

	public readonly createdAt!: Date;
	public readonly updateAt!: Date;
	public readonly deletedAt!: Date;
}

Task.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
    todoText: {
		type: DataTypes.STRING,
		allowNull: false
	},
	isComplete: {
		type: DataTypes.BOOLEAN,
		defaultValue: false

	},
	isArchived: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	timestamps: true,
	sequelize: sequelize,
	paranoid: true,
	modelName: "tasks",
})

export default Task;