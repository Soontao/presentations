using {sap.training} from '../db/schema';


service OtherService {

  @UI.Label : 'Counts'
  entity Counts as projection on training.Count;

}
