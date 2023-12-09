import { IUser } from "./IUser";

export interface IUrl {
    userId: IUser;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    code: string;
    _id: string;
}