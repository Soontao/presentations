using {sap.training} from '../db/schema';

@requires : 'authenticated-user'
service ProtectedClassService {

  @(restrict : [
    {
      grant : ['*'],
      to    : 'ClassesAdmin'
    },
    {
      grant : ['READ'],
      to    : 'ClassesViewer'
    }
  ])
  entity Classes  as projection on training.Class

  @(restrict : [
    {
      grant : ['*'],
      to    : 'StudentsAdmin'
    },
    {
      grant : ['READ'],
      to    : 'StudentsViewer'
    }
  ])
  entity Students as projection on training.Student;

  @(restrict : [
    {
      grant : ['*'],
      to    : 'TeachersAdmin'
    },
    {
      grant : ['READ'],
      to    : 'TeachersViewer'
    }
  ])
  entity Teachers as projection on training.Teacher;

}
