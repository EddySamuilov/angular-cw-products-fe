import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxCharacterCount: number): unknown {
    console.log({value, maxCharCount: maxCharacterCount});

    const dots = value.length > maxCharacterCount ? '...' : '';
    return `${value.substring(0, maxCharacterCount)}${dots}`;
  }

}
