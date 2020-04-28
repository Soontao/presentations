type MetricReponse {

  service : String

}

service IndexService {

  // POST /index/metric HTTP/1.1
  // Host: localhost:4004
  // Content-Type: application/json

  // {
  // }
  action metric() returns MetricReponse;
  // GET, parameter in URI
  function metric2(name : String) returns MetricReponse;

}
