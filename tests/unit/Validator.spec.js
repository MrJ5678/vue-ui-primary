import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Validator from "@/validate";

chai.use(sinonChai);

describe("validate.js", () => {
  it("存在", () => {
    expect(Validator).to.exist;
  });

  it("required true 报错", () => {
    let data = {
      email: ""
    };
    let rules = [{ key: "email", required: true }];
    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.required).to.eq("必填");
  });

  it("required true 通过", () => {
    let data = {
      email: 0
    };
    let rules = [{ key: "email", required: true }];
    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email).to.not.exist;
  });

  it("pattern 报错", () => {
    let data = {
      email: "@tom.com"
    };
    let rules = [{ key: "email", pattern: /^.+@.+$/ }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.pattern).to.eq("格式错误");
  });

  it("pattern 通过", () => {
    let data = {
      email: "1@tom.com"
    };
    let rules = [{ key: "email", pattern: /^.+@.+$/ }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email).to.not.exist;
  });

  it("pattern email 通过", () => {
    let data = {
      email: "1@tom.com"
    };
    let rules = [{ key: "email", pattern: 'email' }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email).to.not.exist;
  })

  it("pattern email 报错", () => {
    let data = {
      email: "@tom.com"
    };
    let rules = [{ key: "email", pattern: 'email' }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.pattern).to.eq("格式错误");
  })

  it("required & pattern", () => {
    let data = {
      email: ""
    };
    let rules = [{ key: "email", pattern: 'email', required: true }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.required).to.exist;
    expect(errors.email.pattern).to.not.exist
  })

  it("pattern & minLength", () => {
    let data = {
      email: ""
    };
    let rules = [{ key: "email", pattern: 'email', minLength: 6 }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.pattern).to.exist;
    expect(errors.email.minLength).to.exist
  })

  it("maxLength", () => {
    let data = {
      email: "123123123123"
    };
    let rules = [{ key: "email", pattern: 'email', maxLength: 10 }];

    let validator = new Validator()
    let errors = validator.validate(data, rules);
    expect(errors.email.maxLength).to.exist
  })

  it("many validators", () => {
    let data = {
      email: "123123123123"
    };

    let rules = [
      {
        key: "email",
        pattern: 'email',
        maxLength: 10,
        minLength: 6,
        hasNumber: true,
        hasUppercaseAndLowercase: true,
        hasDot: true,
        hasUnderline: true
      }
    ];
    let fn = () => {
      let validator = new Validator()
      validator.validate(data, rules);
    }
    expect(fn).to.throw()
  })

  it("可以全局添加规则", () => {
    let data = {
      email: "abcabcabcabcabc"
    };

    Validator.add('hasNumber', (value) => {
      if(!/\d/.test(value)) {
        return '必须含有数字'
      }
    })
    let validator1 = new Validator()
    let validator2 = new Validator()

    let rules = [
      {
        key: "email",
        pattern: 'email',
        maxLength: 10,
        minLength: 6,
        hasNumber: true,
        // hasUppercaseAndLowercase: true,
        // hasDot: true,
        // hasUnderline: true
      }
    ];
    let errors

    expect(() => {
      validator1.validate(data, rules)
    }).to.not.throw()

    expect(() => {
      validator2.validate(data, rules)
    }).to.not.throw()

    // expect(errors.email.hasNumber).to.eq('必须含有数字')
  })
});
