import { User } from "./user";
import { Patient } from "./patient";

export class MeetingUpdate {
    doctor: User;
    patient: Patient;
    oldDate: Date;
    oldHour: number;
    newDate: Date;
    newHour: number;
}