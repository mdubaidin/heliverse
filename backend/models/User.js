import { model, Schema } from 'mongoose';
import { emailValidator } from '../utils/validators.js';

const GENDER = [
    'Male',
    'Female',
    'Bigender',
    'Polygender',
    'Non-binary',
    'Agender',
    'Genderfluid',
    'Genderqueer',
];

const DOMAIN = [
    'Business Development',
    'Finance',
    'IT',
    'Management',
    'Marketing',
    'Sales',
    'UI Designing',
];

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: emailValidator,
                message: props => `${props.value} is not a valid email address!`,
            },
        },
        firstName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 40,
        },
        avatar: String,
        gender: { type: String, enum: GENDER, required: true },
        domain: { type: String, enum: DOMAIN, required: true },
        available: { type: Boolean, default: false },
    },
    { timestamps: true, virtuals: true, toObject: { virtuals: true } }
);

userSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export default model('User', userSchema);
