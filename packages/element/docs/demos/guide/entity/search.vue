<template>
  <div class="entity-search">
    <FormProvider :form="form">
      <!-- Condition -->
      <div class="condition">
        <SchemaField :schema="conditionSchema" />
      </div>
      <!-- Result -->
      <SchemaField :schema="tableSchema" />
    </FormProvider>
  </div>
</template>
<script>
import { createForm } from '@formily/core'
import { ArrayTable, Editable, FormGrid, FormItem, FormLayout, Input, Radio } from '@formily/element'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Button } from 'element-ui'
import { propertyList2FormSchema } from './transform';
import desc from './sample-desc.json'
import codeDesc from './code-desc.json'

const fields = createSchemaField({
  components: {
    ArrayTable,
    Editable,
    FormGrid,
    FormItem,
    Input,
    Radio,
  },
})

const tableSchema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayTable',
      'x-decorator': 'FormItem',
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              width: 80,
              title: 'Index',
              align: 'center',
            },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'A1' },
            properties: {
              a1: {
                type: 'string',
                'x-decorator': 'Editable',
                'x-component': 'Input',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: 'A2' },
            properties: {
              a2: {
                type: 'string',
                'x-decorator': 'Editable',
                'x-component': 'Input',
              },
            },
          },
        },
      },
    },
  },
}

export default {
  name: 'EntitySearch',
  components: {
    Button,
    FormLayout,
    FormProvider,
    ...fields
  },
  props: {
    params: Object,
    dataSource: Array,
    request: Function,
    // form, dynamic
    conditionType: String,
    entityId: String,
    entityName: String,
    properties: Array,
    conditionProps: {
      type: Object,
      default() {
        return {
          minColumns: 2,
          maxColumns: 3
        };
      }
    }
  },
  data() {
    const form = createForm()
    return {
      desc,
      form,
      conditionSchema: {},
      tableSchema,
    };
  },
  created() {
    const propertyList = desc.data.propertyDescList;
    const conditionSchema = propertyList2FormSchema(propertyList, codeDesc, this.conditionProps);
    this.conditionSchema = conditionSchema;
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.entity-search {
  .condition {
    padding: 10px;
    padding-top: 22px;
    background-color: rgb(245, 245, 245);
  }
}
</style>
