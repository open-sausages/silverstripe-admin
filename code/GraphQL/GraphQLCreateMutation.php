<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class GraphQLCreateMutation extends GraphQLCRUDOperation
{
    public function __construct($modelClass, Manager $manager)
    {
        parent::__construct(SchemaScaffolder::CREATE, $modelClass, $manager);
    }

    public function isMutation()
    {
        return true;
    }
}