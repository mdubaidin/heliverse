import { Error as MongooseError } from 'mongoose';
import CustomError from '../classes/CustomError.js';

// bug fix handle mongoose server error

export default function (err, req, res, next) {
    console.log('Handling Error...');
    console.log(err);
    if (err.name === 'Error') return res.error(err.message);

    // Any Error thrown by CustomError
    if (err instanceof CustomError) {
        return res.status(err.statusCode).error({ errors: [err.message] });
    }

    // Any Mongoose Error
    if (err instanceof MongooseError) {
        return handleMongooseError(err, req, res);
    }

    // Mongoose Server Error
    if (err.name === 'MongoServerError') {
        console.log('MongoServerError');
        const error = serverErrors[err.code];
        const field = Object.keys(err.keyValue).join(',');
        return res.status(error.code).error({
            errors: [error.message] + ': ' + field,
        });
    }

    // If no error is matched then say 500
    return error500(res);
}

function error500(res) {
    return res.status(500).error('Something went wrong');
}

const serverErrors = {
    11000: { code: 409, message: 'Duplicate entry for' },
};

function handleMongooseError(err, req, res) {
    const { ValidationError } = MongooseError;

    if (err instanceof ValidationError) {
        const paths = Object.keys(err.errors);
        const errors = paths.map(path => {
            const { kind, message, name } = err.errors[path];

            switch (name) {
                case 'ValidatorError':
                    return message.replace('Path', 'Field');

                case 'CastError':
                    return `Field \`${path}\` should be of type \`${kind}\``;
            }
            // return { kind, message, path, name };
        });
        console.log(errors);
        return res.status(400).error({ errors });
    }

    return error500(res);
}
