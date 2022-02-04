<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formTab }" />
    <FormButtonGroup alignFormItem>
      <Button
        @click="
          () => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }
        "
      >
        显示/隐藏最后一个Tab
      </Button>
      <Button
        @click="
          () => {
            formTab.setActiveKey('tab2')
          }
        "
      >
        切换第二个Tab
      </Button>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormGrid,
  FormItem,
  FormTab,
  FormButtonGroup,
  Submit,
  Input,
  ArrayTable,
} from '@formily/element'
import { Button } from 'element-ui'

const { SchemaField } = createSchemaField({
  components: {
    FormGrid,
    FormItem,
    FormTab,
    Input,
    ArrayTable,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-component': 'FormTab',
      'x-component-props': {
        formTab: '{{formTab}}',
      },
      properties: {
        tab1: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A1',
          },
          properties: {
            grid: {
              type: 'void',
              'x-component': 'FormGrid',
              'x-component-props': {
                minColumns: 2,
                maxColumns: 4,
              },
              properties: {
                aaa: {
                  type: 'string',
                  title: 'AAA',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                bbb: {
                  type: 'string',
                  title: 'BBB',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                ccc: {
                  type: 'string',
                  title: 'CCC',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                ddd: {
                  type: 'string',
                  title: 'DDD',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                eee: {
                  type: 'string',
                  title: 'EEE',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                fff: {
                  type: 'string',
                  title: 'FFF',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                ggg: {
                  type: 'string',
                  title: 'GGG',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },
        tab2: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A2',
          },
          properties: {
            array: {
              type: 'array',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayTable',
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
                    'x-component-props': { width: 200, title: 'A1' },
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
                    'x-component-props': { width: 200, title: 'A2' },
                    properties: {
                      a2: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                  column4: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': { title: 'A3' },
                    properties: {
                      a3: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                  column5: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': {
                      title: 'Operations',
                      prop: 'operations',
                      width: 200,
                      fixed: 'right',
                    },
                    properties: {
                      item: {
                        type: 'void',
                        'x-component': 'FormItem',
                        properties: {
                          remove: {
                            type: 'void',
                            'x-component': 'ArrayTable.Remove',
                          },
                          moveDown: {
                            type: 'void',
                            'x-component': 'ArrayTable.MoveDown',
                          },
                          moveUp: {
                            type: 'void',
                            'x-component': 'ArrayTable.MoveUp',
                          },
                        },
                      },
                    },
                  },
                },
              },
              properties: {
                add: {
                  type: 'void',
                  'x-component': 'ArrayTable.Addition',
                  title: '添加条目',
                },
              },
            },
          },
        },
        tab3: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A3',
          },
          properties: {
            ccc: {
              type: 'string',
              title: 'CCC',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

export default {
  components: {
    FormProvider,
    FormButtonGroup,
    Button,
    Submit,
    SchemaField,
  },

  data() {
    const form = createForm()
    const formTab = FormTab.createFormTab()

    return {
      schema,
      form,
      formTab,
    }
  },
  methods: {
    log(values) {
      console.log(values)
    },
  },
}
</script>

<style lang="scss" scoped></style>
