import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
    static mustContainTestValidator(control:FormControl): {[s: string]: boolean}{
        const controlValue = String(control.value).toLowerCase();
        if(!controlValue.includes('test'))
        return {'nameIsForbidden': true}
        return null;
    }
    static mustContainTestAsyncValidator(control:FormControl): Promise<any> | Observable<any>{
      const promise = new Promise<any>((resolve,reject) => {
        const controlValue = String(control.value).toLowerCase();
        setTimeout(() => {
          if(!controlValue.includes('gmail'))
          resolve({'nameIsForbidden': true});
          resolve(null);
        }, 1000);
      });
      return promise;
    }
}