export NODE_ENV=production
cds build
cf push -f gen/srv # deploy service
cf bind-service cap-02-srv cap-02-uaa # bind uaa service