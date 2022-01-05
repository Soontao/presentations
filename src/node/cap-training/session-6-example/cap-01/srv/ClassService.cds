using {sap.training} from '../db/schema';

@impl : './class-service.js' // manual define the service, implmentation
service ClassService {
  @UI.LineItem : [
  {Value : name},
  {Label : 'Class Name'}
  ]
  entity Classes  as projection on training.Class;

  entity Students as projection on training.Student;
  entity Teachers as projection on training.Teacher;
}
