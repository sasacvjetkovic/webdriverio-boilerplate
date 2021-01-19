class LoginEntity {

    private _email: string;
    private _password: string;

    constructor() {
        this._email = '';
        this._password = '';
    }

    public get email() {
        return this._email;
    }

    public set email(theEmail: string) {
        if (!theEmail) {
            throw new Error('Invalid email.');
        }
        this._email = theEmail;
    }

    public get password() {
        return this._password;
    }

    public set password(thePassword: string) {
        if (!thePassword) {
            throw new Error('Invalid password.');
        }
        this._password = thePassword;
    }
}

export let loginEntity = new LoginEntity();