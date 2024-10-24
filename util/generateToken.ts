import { sign } from "jsonwebtoken";

export function generateToken(email: string) {
    const payload = { email: email };
    return sign(payload, process.env.JWT_PRIVATE_KEY as string, {
        expiresIn: "1h",
    });
}
