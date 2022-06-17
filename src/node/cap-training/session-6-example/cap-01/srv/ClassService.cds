using {sap.training} from '../db/schema';

@impl : './lib/class-service.js' // manual define the service, implmentation
service ClassService {

  entity Students @(cds.features : [
    {
      on      : 'READ',
      enabled : 'feat-studenet-get'
    },
    {
      on      : 'UPDATE',
      enabled : 'feat-studenet-update'
    },
    {
      on      : 'DELETE',
      enabled : 'feat-studenet-delete'
    }
  ])              as projection on training.Student;

  entity Teachers as projection on training.Teacher;

  @cds.redirection.target
  @odata.draft.enabled
  entity Classes  as projection on training.Class actions {
    // bounded action
    function getName() returns String(255);
  };


  // Yes, group by
  view ClassesView as
    select
      Class.teacher.name,
      count(1) as totalClass : Integer
    from training.Class
    group by
      Class.teacher.name;


}
