namespace sap.training;

using {cuid} from '@sap/cds/common';

// if you have multi entities (with relationship), please define them in single file

// many to many association seems have some problem
// https://github.wdf.sap.corp/cap/matters/issues/670

entity Student : cuid {

  name : String;
  age  : Integer;

// classes : Association to many Class
//             on classes.students = $self;

}

entity Class : cuid {
  name    : String;
  teacher : Association to Teacher;
// students : Association to many Student
//              on students.classes = $self

}

entity Teacher : cuid {

  name    : String;

  classes : Association to many Class
              on classes.teacher = $self

}
