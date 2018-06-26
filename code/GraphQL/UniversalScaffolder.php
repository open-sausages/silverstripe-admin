<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\Core\ClassInfo;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\OperationScaffolder;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\DataObjectSchema;

class UniversalScaffolder implements ScaffoldingProvider
{
    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        foreach(ClassInfo::subclassesFor(DataObject::class) as $dataObjectClass) {
            if ($dataObjectClass === DataObject::class) continue;
            $dataObjectScaffold = $scaffolder
                ->type($dataObjectClass)
                ->addAllFields();
            foreach(OperationScaffolder::getOperations() as $identifier => $class) {
                $dataObjectScaffold->operation($identifier);
            }
            $dataObjectScaffold->operation(SchemaScaffolder::READ)
                // total hack
                ->addSortableFields(array_keys(
                    Injector::inst()->get($dataObjectClass)->getSchema()->databaseFields($dataObjectClass)
                ))
                ->end();
        }

        return $scaffolder;
    }
}