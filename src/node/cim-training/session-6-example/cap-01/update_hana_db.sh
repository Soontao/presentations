# check the gen/db/manifest - services - hana instance name
# you must create the hana instance by your self
export NODE_ENV=production
cds build
cf push -f gen/db