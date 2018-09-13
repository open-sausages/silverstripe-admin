<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class GraphQLDeleteMutation extends GraphQLCRUDOperation
{

    public function __construct($modelClass, Manager $manager)
    {
        parent::__construct(SchemaScaffolder::DELETE, $modelClass, $manager);
        $this->setFields(['ID']);
    }

    public function isMutation()
    {
        return true;
    }
}