type MetricResponse {
  Status  : Integer;
  Service : String(500);
  User    : String(500);
}

@requires : 'authenticated-user'
service IndexService {
  function metric() returns MetricResponse;

  @requires : 'admin_user'
  function limit() returns MetricResponse;
}
