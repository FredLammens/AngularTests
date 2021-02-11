import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): unknown {
    const splitString = value.split("");
    const reverseStringArr = splitString.reverse();
    const reversedString = reverseStringArr.join("");
    return reversedString;
  }

}
