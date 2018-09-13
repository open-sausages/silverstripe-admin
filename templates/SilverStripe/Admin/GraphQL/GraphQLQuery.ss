<% if $IsMutation %>mutation<% else %>query<% end_if %> $OperationName(
<% loop $Args %>
    ${$Name}:{$Type}<% if not $Last %>, <% end_if %>
<% end_loop %>
) {
  $QueryName(
    <% loop $Args %>
      {$Name}:${$Name}<% if not $Last %>, <% end_if %>
    <% end_loop %>
  ) <% if $Fields %>{
    <% loop $Fields %>
      $FieldName
    <% end_loop %>
  }<% end_if %>
}