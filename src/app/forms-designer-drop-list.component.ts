import { Component, Input, Output, EventEmitter, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'forms-designer-drop-list',
  template: `
    <div
      cdkDropList
      [cdkDropListData]="formlyList"
      [cdkDropListConnectedTo]="dropListConnectedTo"
      class="example-list"
      cdkDropListOrientation="horizontal"
      (cdkDropListDropped)="drop($event)">
      <div class="example-box" *ngFor="let formly of formlyList" cdkDrag>
        <form [formGroup]="formly.form">
          <formly-form [model]="model" [fields]="formly.formFields" [options]="formly.options" [form]="formly.form">
         </formly-form>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['app.component.scss'],
})
export class FormsDesignerDropListComponent implements AfterContentInit, OnDestroy {

  @ViewChild(CdkDropList) el: CdkDropList;

  @Input() formlyList;
  @Input() dropListConnectedTo;
  @Input() model;
  @Output() register = new EventEmitter<CdkDropList>();
  @Output() unregister = new EventEmitter<CdkDropList>();

  ngAfterContentInit(): void {
    this.register.emit(this.el);
  }

  ngOnDestroy(): void {
    this.unregister.emit(this.el);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('move', event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transfer', event);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
