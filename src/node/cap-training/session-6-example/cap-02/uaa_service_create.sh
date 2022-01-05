cds compile srv/ --to xsuaa > xs-security.json
cf create-service xsuaa application cap-02-uaa -c xs-security.json