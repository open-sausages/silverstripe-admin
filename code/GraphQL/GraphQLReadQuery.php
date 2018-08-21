<?php

namespace SilverStripe\Admin\GraphQL;

use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\CRUD\Read;
use SilverStripe\ORM\DataList;
use BadMethodCallException;
use SilverStripe\ORM\DataObject;

class GraphQLReadQuery extends GraphQLQuery
{
    /**
     * @var string
     */
    protected $modelClass;

    /**
     * @var Manager
     */
    protected $manager;

    /**
     * GraphQLReadQuery constructor.
     * @param string $modelClass
     * @param Manager $manager
     */
    public function __construct($modelClass, Manager $manager)
    {
        $this->setModelClass($modelClass);
        $this->setManager($manager);

        parent::__construct();
    }

    /**
     * @return string
     */
    public function getModelClass()
    {
        return $this->modelClass;
    }

    /**
     * @param string $class
     * @return $this
     */
    public function setModelClass($class)
    {
        $this->modelClass = $class

        return $this;
    }

    /**
     * @return Manager
     */
    public function getManager()
    {
        return $this->manager;
    }

    /**
     * @param Manager $manager
     * @return $this
     */
    public function setManager(Manager $manager)
    {
        $this->manager = $manager;

        return $this;
    }

    /**
     * @return string
     */
    public function getOperationName()
    {
        return ucfirst($this->getQueryName());
    }

    /**
     * @param string $name
     * @throws BadMethodCallException
     * @return void
     */
    public function setQueryName($name)
    {
        throw new BadMethodCallException('Cannot set query name for a scaffolded query');
    }

    /**
     * @return GraphQLData
     */
    public function getQueryData()
    {
        $class = $this->getModelClass();
        /* @var Read $scaffolder */
        $scaffolder = Injector::inst()->createWithArgs(Read::class, [$class]);
        $name = $scaffolder->getName();
        $query = $this->getManager()->getQuery($name);

        $data = parent::getQueryData();
        $data->UsePagination = $this->getUsePagination();

        return $data->setTemplate(static::class);
    }

    /**
     * @param array $args
     * @return array
     */
    protected function normaliseArgs(array $args)
    {
        $result = [];
        foreach ($args as $name => $config) {
            /* @var Type $type */
            $type = $config['type'];
            $result[$name] = $type->toString();
        }

        return $result;
    }
}