class Validator {
  constructor() {
  }

  static add(name, fn) {
    Validator.prototype[name] = fn
  }

  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
      let value = data[rule.key]
      if(rule.required) {
        let error = this.required(value)
        if (error) {
          ensureObject(errors, rule.key)
          errors[rule.key].required = error
          return errors
        }
      }

      let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
      // console.log(validators);
      // 遍历 validators ，并逐一调用对应的函数
      validators.forEach(validatorKey => {
        if(this[validatorKey]) {
          let error = this[validatorKey](value, rule[validatorKey])
          if(error) {
            ensureObject(errors, rule.key)
            errors[rule.key][validatorKey] = error
          }
        } else {
          // console.log(`不存在的校验器: ${validatorKey}`)
          throw `不存在的校验器: ${validatorKey}`
        }
      })
    })
    return errors
  }

  required = (value) => {
    if (!value && value !== 0) {
      return "必填"
    }
  }

  pattern = (value, pattern) => {
    if(pattern === 'email') {
      pattern = /^.+@.+$/
    }
    if(!pattern.test(value)) {
      return "格式错误"
    }
  }

  minLength = (value, minLength) => {
    if(value.length < minLength) {
      return "太短了"
    }
  }

  maxLength = (value, maxLength) => {
    if(value.length > maxLength) {
      return "太长了"
    }
  }
}

function ensureObject(obj, key) {
  if(typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

export default Validator