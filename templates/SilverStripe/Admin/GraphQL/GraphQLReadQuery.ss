query $OperationName(

  <% loop $Args %>
      ${$Name}:{$Type}<% if not $Last %>, <% end_if %>
  <% end_loop %>

) {
  $QueryName(

    <% loop $Args %>
      {$Name}:${$Name}<% if not $Last %>, <% end_if %>

    <% end_loop %>

) {
    edges {
      node {
        <% loop $Fields %>
          $FieldName
        <% end_loop %>
      }
    }
    pageInfo {
      totalCount
      hasPreviousPage
      hasNextPage
    }
  }
}