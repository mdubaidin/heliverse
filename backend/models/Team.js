import { model, Schema, Types } from 'mongoose';

const DOMAIN = [
    'Business Development',
    'Finance',
    'IT',
    'Management',
    'Marketing',
    'Sales',
    'UI Designing',
];

const teamSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 3,
            required: true,
        },
        avatar: String,
        domain: { type: String, enum: DOMAIN, required: true },
        available: { type: Boolean, required: true },
        members: {
            type: [Types.ObjectId],
            ref: 'User',
            validate: {
                validator: function (v) {
                    return v !== null && v.length > 0;
                },
                message: `field 'Members' is required`,
            },
        },
    },
    { timestamps: true }
);

teamSchema.index({ available: 1, domain: 1 }, { unique: true });

export default model('Team', teamSchema);
