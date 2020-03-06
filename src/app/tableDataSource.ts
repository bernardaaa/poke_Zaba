import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface Data { }
export class TableDataSource extends DataSource<any> {
  constructor(public data: any) {
    super();
  }
  connect(): Observable<Data[]> {
    return Observable.of(this.data);
  }
  disconnect(): void {    // No-op
  }
}
