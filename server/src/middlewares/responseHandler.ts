class ResponseBeautifier {
    response: {
      code: string;
      data: any;
      msg: string;
    };
    StatusCode: Map<string, string>;
  
    constructor() {
      this.response = {
        code: "",
        data: {},
        msg: "",
      };
      this.StatusCode = new Map();
      this.registeStatusCode("0", "OK");
      this.registeStatusCode("-1", "ERROR");
    }
  
    registeStatusCode(code: string, description: string): void {
      this.StatusCode.set(code, description);
    }
  
    registeStatusCodes(arr: [string, string][]): void {
      for (let [code, description] of arr) {
        this.StatusCode.set(code, description);
      }
    }
  
    set(data: any, code: string | number = "0", msg?: string): any {
      code = code.toString();
      if (this.StatusCode.has(code)) {
        return {
          code,
          data,
          msg: this.StatusCode.get(code),
        };
      } else {
        // log Something ,here is an unique code
        return {
          code,
          data,
          msg: msg || "Unresolvable Status Code :" + code,
        };
      }
    }
  
    error(code: string = "-1", msg?: string): any {
      code = code.toString();
      if (this.StatusCode.has(code)) {
        return {
          code,
          data: {},
          msg: this.StatusCode.get(code),
        };
      } else {
        // log Something ,here is an unique code
        return {
          code,
          data: {},
          msg: msg || "Unresolvable Status Code :" + code,
        };
      }
    }
  }
  
  const responseBeautifier = new ResponseBeautifier();
  
  //registe Status Code
  
  responseBeautifier.registeStatusCodes([
    ["404", "NtFound"],
    ["200", "success"],
    ["1", "等待中"],
  ]);
  
  export default responseBeautifier;
  