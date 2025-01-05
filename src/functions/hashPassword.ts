import * as bcrypt from 'bcrypt';

function hashPassword(password: string, salt: number): string {
    return bcrypt.hashSync(password, salt);
}

export default hashPassword