query $OperationName {
  $QueryName {
    <% loop $Fields %>
      $FieldName
    <% end_loop %>
  }
}