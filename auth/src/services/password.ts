import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// this is to change the implementation from callback to async
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");

    // this lets typescript know that buf is a buffer
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    // return true is the stored password is equal to the hashed password during sign in
    return buf.toString("hex") === hashedPassword;
  }
}
