using {sap.training} from '../db/schema';


service ClassService {
  entity Classes  as projection on training.Class;
  entity Students as projection on training.Student;
  entity Teachers as projection on training.Teacher;
}
