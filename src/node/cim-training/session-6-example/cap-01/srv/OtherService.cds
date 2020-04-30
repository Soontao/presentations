using {sap.training} from '../db/schema';

type PlusReqeust {
  ID    : Integer;
  Count : Integer;
}


service OtherService {

  @UI.Label : 'Counts'
  entity Counts as projection on training.Count;
  //actions {
  // removed, not work
  // https://github.wdf.sap.corp/cap/matters/issues/805
  // action plus_count(); // bounded (instance) action
  //};

  action plus(body : PlusReqeust) returns Counts;

}
