using {sap.training} from '../db/schema';

@impl : './lib/class-service.js' // manual define the service, implmentation
service ClassService {

  @cds.redirection.target
  entity Classes  as projection on training.Class

  actions {
    // bounded action
    function getName() returns String(255);
  };


  entity Students as projection on training.Student;
  entity Teachers as projection on training.Teacher;

  // Yes, group by
  view ClassesView as
    select
      Class.teacher.name,
      count(
        1
      ) as totalClass : Integer
    from training.Class
    group by
      Class.teacher.name;
}
