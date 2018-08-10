import { User } from "./user";
import { Patient } from "./patient";

export class Meeting {
    doctor: User;
    patient: Patient;
    date: Date;
    hour: number;
}