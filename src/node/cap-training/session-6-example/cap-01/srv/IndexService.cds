type MetricReponse {

  service : String

}

@impl : './lib/IndexService.js'
service IndexService {

  // POST /index/metric HTTP/1.1
  // Host: localhost:4004
  // Content-Type: application/json

  // {
  // }
  @cds.features.redirect.target : [metricV2]
  action metric() returns MetricReponse;

  @cds.features.enabled         : 'feature-metrics-v2'
  @cds.features.redirect.target : [metricV3]
  action metricV2() returns MetricReponse;

  @cds.features.enabled : 'feature-metrics-v3'
  action metricV3() returns MetricReponse;

  // GET, parameter in URI
  function metric2(name : String) returns MetricReponse;
  // unbounded action
  function classRecords() returns Integer;
  function firstClassId() returns Integer;

}
