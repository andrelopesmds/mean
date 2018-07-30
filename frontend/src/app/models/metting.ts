import { User } from "./user";
import { Patient } from "./patient";
import { Time } from "@angular/common";

export class Meeting {
    doctor: User;
    patient: Patient;
    date: Date;
    hour: number;
}