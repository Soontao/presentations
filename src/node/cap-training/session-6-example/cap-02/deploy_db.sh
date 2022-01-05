export NODE_ENV=production
cds build
cf push -f gen/db # deploy database