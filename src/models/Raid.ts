import { Schema, model } from "mongoose";

export interface IRaid {
	_id: Schema.Types.ObjectId;
	active: boolean;
	date: number;
}

const schema = new Schema<IRaid>({
	active: { type: Boolean, default: true },
	date: { type: Number, required: true },
});

export const Raid = model<IRaid>("Raid", schema);
