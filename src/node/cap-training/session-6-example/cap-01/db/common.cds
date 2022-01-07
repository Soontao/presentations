namespace sap.training;

type PeopleName {
  first_name  : String(255);
  middle_name : String(255);
  last_name   : localized String(255); // localized, not work
}

// type TextCollection : many String(1000); // not work
