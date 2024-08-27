const emailValidator = v =>
    /^(?!\.)([\w-]|(\.(?!\.))|(\+(?!\+)))+@([\w-]+\.(?!\.))+[\w-]{2,4}$/.test(v);
const usernameValidator = v => /^[a-z]([a-z0-9]|(\.(?!\.)))*[a-z0-9]$/.test(v);

export { emailValidator, usernameValidator };
