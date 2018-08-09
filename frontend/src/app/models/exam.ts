import { User } from "./user";
import { Patient } from "./patient";

export class Exam {
    examType: string;
    doctor: User;
    patient: Patient;
    date: Date;
    received: boolean;
    result: string;
}