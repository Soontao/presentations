# check the gen/db/manifest - services - hana instance name
# you must create the hana instance by your self
export NODE_ENV=production
export TRACE=true
export DEBUG=*
# cds build
cp default-env.json ./gen/db/
cd ./gen/db
npm i
npm start -- --exit