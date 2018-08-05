import { User } from "./user";
import { Patient } from "./patient";
import { Medicine } from "./medicine";

export class Prescription {
    doctor: User;
    patient: Patient;
    date: Date;
    medicine: Medicine;
    cicle: string;
}