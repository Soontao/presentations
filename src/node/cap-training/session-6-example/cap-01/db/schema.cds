namespace sap.training;

using {
  cuid,
  managed
} from '@sap/cds/common';
using {sap.training} from './common';

// if you have multi entities (with relationship), please define them in single file

// many to many association seems have some problem
// https://github.wdf.sap.corp/cap/matters/issues/670

aspect SeqID : managed {
  key id : Integer;
}


entity Student : SeqID {
  name    : training.PeopleName;
  age     : Integer default 18;
  weight  : Decimal;
  classes : Association to many ClassRel
              on classes.student = $self;

}

@cds.autoexpose
entity ClassRel : SeqID {
  key student : Association to Student;
  key class   : Association to Class;
}

entity Class : SeqID {
  name     : localized String(255);
  teacher  : Association to Teacher;
  students : Association to many ClassRel
               on students.class = $self

}

entity Teacher : SeqID {
  name    : training.PeopleName;
  classes : Association to many Class
              on classes.teacher = $self
}

entity Count : SeqID {
  count          : Integer default 0;
  sCount         : String(16);
  virtual count2 : Integer default 0;
}

entity Table1 : cuid {
  c1 : Integer;
}

entity Table2 : Table1 {
  c2 : Integer;
}
