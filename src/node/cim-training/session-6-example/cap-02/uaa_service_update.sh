cds compile srv/ --to xsuaa > xs-security.json
cf update-service cap-02-uaa -c xs-security.json