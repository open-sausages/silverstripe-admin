<?php

namespace SilverStripe\Admin\GraphQL;

use GraphQL\Type\Definition\Type;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\GraphQL\Manager;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\CRUD\Read;
use Exception;
use BadMethodCallException;

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
        $this->modelClass = $class;

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
     * @return GraphQLData
     * @throws BadMethodCallException
     * @throws Exception
     */
    public function getQueryData()
    {
        if ($this->queryName) {
            user_error('Cannot set query name for a scaffolded query. It gets overridden.', E_NOTICE);
        }
        $class = $this->getModelClass();
        /* @var Read $scaffolder */
        $scaffolder = Injector::inst()->createWithArgs(Read::class, [$class]);
        $name = $scaffolder->getName();
        $query = $this->getManager()->getQuery($name);
        if (!$query) {
            throw new Exception(sprintf('Could not find query %s for %s.', $name, $class));
        }
        if (is_callable($query)) {
            $query = call_user_func($query);
        }

        $this->setArgs($this->normaliseArgs($query['args']))
             ->setQueryName($name);
        return parent::getQueryData();
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