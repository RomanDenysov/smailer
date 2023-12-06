import { IUser } from "./IUser";

export interface IUrl {
    userId: IUser;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    _id: string;
}