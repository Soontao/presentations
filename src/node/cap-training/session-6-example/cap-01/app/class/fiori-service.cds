using {ClassService} from '../../srv/ClassService';


annotate ClassService.Classes with @(UI : {
  HeaderInfo         : {
    TypeName       : 'Class',
    TypeNamePlural : 'Classes',
    Description    : {Value : name}
  },
  HeaderFacets       : [{
    $Type  : 'UI.ReferenceFacet',
    Label  : 'Header',
    Target : '@UI.FieldGroup#Descr'
  }],
  Facets             : [{
    $Type  : 'UI.ReferenceFacet',
    Label  : 'Details',
    Target : '@UI.FieldGroup#Detail'
  }],
  FieldGroup #Descr  : {Data : [
    {Value : id},
    {Value : name},
  ]},
  FieldGroup #Detail : {Data : [
    {Value : teacher.name.first_name},
    {Value : teacher.name.last_name},
    {Value : createdAt},
    {Value : createdBy},
  ]},
});


annotate ClassService.Classes with @(UI : {
  SelectionFields : [
    id,
    name,
    teacher_id,
  ],
  LineItem        : [
    {Value : id},
    {Value : name},
    {Value : teacher.name.first_name},
    {Value : teacher.name.last_name},
  ]
});
