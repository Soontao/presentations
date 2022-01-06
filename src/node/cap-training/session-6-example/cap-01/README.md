# CAP Demo Project

## env file

```env
CDS_CONFIG='{"requires":{"[development]":{"auth":{"kind":"basic-auth","users":{"reader":{"roles":["ClassesViewer","StudentsViewer","TeachersViewer"]}}}}}}'
DEBUG=db
```

## generate xsuaa definition

```bash
cds compile ./srv/ --to xsuaa > xs-security.json
```