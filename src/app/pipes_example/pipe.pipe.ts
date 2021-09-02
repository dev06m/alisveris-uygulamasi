import { Pipe, PipeTransform } from '@angular/core';
import { Server } from './pipes/pipes.component';

@Pipe({
  name: 'filterPipe',
  pure: false // bunu yaptigimda herhangi bi data degistiginde bu pipe'i tekrar calistirmak zorunda kalacak ve bu da performans maliyeti demek
})
export class PipePipe implements PipeTransform {

  transform(values: Server[], property: string, filter: string): unknown {
    if (values.length === 0 || filter === "") {
      return values;
    }

    const arr = []
    for (const value of values) {
      console.log(value, )
      if (value[property]?.toLowerCase() === filter?.toLowerCase()) {
        arr.push(value)
      }
    }
    return arr;
  }

}
