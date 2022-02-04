import { isArr, isFn, isEmpty } from '@formily/shared'

function getSchemaPropertyId(val) {
  if (isEmpty(val)) {
    return 'unknown name';
  }
  if (isEmpty(val.propertyAlias)) {
    return val.propertyId;
  }
  return val.propertyAlias;
}

function dataTypeJdbc2SchemaType(val) {
  let type = 'string';
  if (isEmpty(val)) {
    return type;
  }
  const { dataTypeJdbc } = val;
  switch (dataTypeJdbc) {
    case -16: // LONGNVARCHAR
    case -9: // NVARCHAR
    case 1: // CHAR
    case 12: // VARCHAR
      type = 'string';
      break;
    case -6: // TINYINT
    case -5: // BIGINT
    case 4: // INTEGER
    case 5: // SMALLINT
      type = 'integer';
      break;
    case 2: // NUMERIC
    case 3: // DECIMAL
    case 6: // FLOAT
    case 7: // REAL
    case 8: // DOUBLE
      type = 'number';
      break;
    default:
      type = 'string';
  }
  return type;
}

function showType2Component(val = {}) {
  let ret = '';
  const { showType } = val;
  switch (showType) {
    case 0:
      ret = 'Input';
      break;
    case 20:
    case 21:
      ret = 'Select';
      break;
    case 30:
      ret = 'Radio.Group';
      break;
    case 40:
      ret = 'Checkbox';
      break;
    default:
      ret = 'Input';
  }
  return ret;
}

function codeDesc2SchemaEnum(val = {}, codeDescList) {
  const { referCodeId } = val;
  if (isEmpty(codeDescList) || isEmpty(referCodeId)) {
    return null;
  }
  console.log(codeDescList);
  const codeList = codeDescList.find(d => d.codeId === referCodeId);
  if (isEmpty(codeList) || isEmpty(codeList.itemList)) {
    return null;
  }
  return codeList.itemList.map(data => {
    return {
      value: data.value,
      label: data.name
    }
  })
}

export function propertyList2FormSchema(propertyList, codeDescList, formProps) {
  const properties = {
  };
  
  // aaa: {
  //   type: 'string',
  //   title: 'AAA',
  //   'x-decorator': 'FormItem',
  //   'x-component': 'Input',
  // },
  propertyList.forEach((prop) => {
    const schemaProperty = {};
    const {
      propertyId,
      propertyName
    } = prop;
    // id
    const id = getSchemaPropertyId(prop);
    // Type
    schemaProperty.type = dataTypeJdbc2SchemaType(prop);
    // Title
    let title = '';
    if (isEmpty(propertyName)) {
      title = propertyId;
    } else {
      title = propertyName;
    }
    schemaProperty.title = title;
    // visible
    schemaProperty['x-hidden'] = prop.unVisible === 1;
    // Enum
    schemaProperty.enum = codeDesc2SchemaEnum(prop, codeDescList);
    // x-decorator
    schemaProperty['x-decorator'] = 'FormItem';
    // Component
    schemaProperty['x-component'] = showType2Component(prop);
    properties[id] = schemaProperty;
  })
  
  return {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': formProps,
        properties,
      },
    },
  };
}

export function propertyList2TableSchema(propertyList) {
  const ret = {}
  propertyList.forEach((prop) => {
    
  })
  return ret;
}
