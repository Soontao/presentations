using {sap.training.Table3} from '../db/schema';

@impl : './lib/imp-service.js'
service ImportantService {

  entity Table3s as projection on Table3 excluding {
    deleted
  } where deleted = false;

}
