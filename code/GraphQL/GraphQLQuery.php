<?php

namespace SilverStripe\Admin\GraphQL;

use SilverStripe\Core\Injector\Injectable;
use SilverStripe\ORM\ArrayList;
use SilverStripe\View\ArrayData;

class GraphQLQuery
{
    use Injectable;

    /**
     * @var string
     */
    protected $queryName;

    /**
     * @var string
     */
    protected $operationName;

    /**
     * @var array
     */
    protected $fields = [];

    /**
     * @var array
     */
    protected $args = [];

    /**
     * @var array
     */
    protected $variables = [];

    /**
     * @var bool
     */
    protected $isMutation = false;

    /**
     * @var string
     */
    protected $template = 'GraphQLQuery';

    /**
     * GraphQLQuery constructor.
     * @param string $operationName
     * @param string $queryName
     * @param array $fields
     * @param array $args
     */
    public function __construct($operationName = null, $queryName = null, $fields = [], $args = [])
    {
        $this->operationName = $operationName;
        $this->queryName = $queryName;
        $this->fields = $fields;
        $this->args = $args;
    }

    /**
     * @param array $fields
     * @return $this
     */
    public function setFields(array $fields)
    {
        $this->fields = $fields;

        return $this;
    }

    /**
     * @return array
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @return string
     */
    public function getQueryName()
    {
        return $this->queryName;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setQueryName($name)
    {
        $this->queryName = $name;

        return $this;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setOperationName($name)
    {
        $this->operationName = $name;

        return $this;
    }

    /**
     * @return string
     */
    public function getOperationName()
    {
        return $this->operationName;
    }

    /**
     * @param array $args
     * @return $this
     */
    public function setArgs(array $args)
    {
        $this->args = $args;

        return $this;
    }

    /**
     * @return array
     */
    public function getArgs()
    {
        return $this->args;
    }

    /**
     * @param $template
     * @return $this
     */
    public function setTemplate($template)
    {
        $this->template = $template;

        return $this;
    }

    /**
     * @return string
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * @param array $vars
     * @return $this
     */
    public function setVariables(array $vars)
    {
        $this->variables = $vars;

        return $this;
    }

    /**
     * @return array
     */
    public function getVariables()
    {
        return $this->variables;
    }

    /**
     * @return GraphQLData
     */
    public function getQueryData()
    {
        $data = GraphQLData::create([
            'OperationName' => $this->getOperationName(),
            'QueryName' => $this->getQueryName(),
            'Fields' => $this->createFieldList(),
            'Args' => $this->createArgList(),
            'IsMutation' => $this->isMutation(),
        ]);

        return $data->setTemplate(__NAMESPACE__ . '\\' . $this->getTemplate());
    }

    /**
     * @return boolean
     */
    public function isMutation()
    {
        return $this->isMutation;
    }

    /**
     * @param $bool
     * @return $this
     */
    public function setIsMutation($bool)
    {
        $this->isMutation = (boolean) $bool;

        return $this;
    }

    /**
     * @return ArrayList
     */
    protected function createFieldList()
    {
        $list = ArrayList::create();
        $list->push(ArrayData::create(['FieldName' => 'ID']));
        foreach ($this->fields as $field) {
            $list->push(ArrayData::create(['FieldName' => $field]));
        }

        return $list;
    }

    /**
     * @return ArrayList
     */
    protected function createArgList()
    {
        $list = ArrayList::create();
        foreach ($this->args as $name => $typeStr) {
            $list->push(ArrayData::create([
                'Name' => $name,
                'Type' => $typeStr,
            ]));
        }

        return $list;
    }

}