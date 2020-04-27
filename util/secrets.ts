import {Secret} from "jsonwebtoken";

// export const MONGODB_URI = "mongodb://127.0.0.1:27017/r4all";

// if (!MONGODB_URI) {
//     console.log("No mongo connection string. Set MONGODB_URI environment variable.");
//     process.exit(1);
// }


export const JWT_SECRET:Secret = "mysecretJWT" as Secret;

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}