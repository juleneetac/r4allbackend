import mongoose = require("mongoose");
import { Schema, model } from 'mongoose';

const PointSchema: Schema = new Schema (
    {
        type: String,
        coordinates: { type: [Number], required: true}
    }
);

export default model('Point', PointSchema);