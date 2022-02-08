namespace sap.training;

type PeopleName {
  first_name  : String(255);
  middle_name : String(255);
  last_name   : localized String(255); // localized, not work
}

type ShortString : String(120);
type LongString : String(255);

// type TextCollection : many String(1000); // not work
