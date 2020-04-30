using {sap.training} from '../db/schema';


service OtherService {

  @UI.Label : 'Counts'
  entity Counts as projection on training.Count actions {
    action plus_count(); // bounded (instance) action
  };

}
