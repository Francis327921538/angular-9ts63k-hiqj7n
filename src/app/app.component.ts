import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';

export interface FormsDesignerFormly {
  form: FormGroup;
  options: FormlyFormOptions;
  formFields: FormlyFieldConfig[];  // used for formly
  fields: FormlyFieldConfig[];      // used for persisting
}
@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formlyList: FormsDesignerFormly[] = [];
  formlyList2: FormsDesignerFormly[] = [];
  formlyListTemplate: FormsDesignerFormly[];

  dropListConnectedTo = [];

  constructor(
  ) { }

  ngOnInit() {

    const tempFormlyList: FormsDesignerFormly[] = [];

    this.push(tempFormlyList, <FormlyFieldConfig[]>[
      {
        className: 'h5',
        template: 'My template 1',
      },
    ]);

    this.push(tempFormlyList, <FormlyFieldConfig[]>[
      {
        template: '<div class="pt-3">My template 2</div>',
      },
    ]);

    this.push(tempFormlyList, <FormlyFieldConfig[]>[
      {
        key: 'myInput',
        type: 'input',
        templateOptions: {
          label: 'myInput',
          required: true,
        },
      },
    ]);

    this.formlyList = this.fix(tempFormlyList);
    this.formlyList2 = this.fix(tempFormlyList);
    this.formlyListTemplate = this.fix(tempFormlyList);
  }

  register(el: CdkDropList) {
    this.dropListConnectedTo.push(el);
    console.log(this.dropListConnectedTo);
  }

  push(arr, fields: FormlyFieldConfig[]) {
    arr.push(<FormsDesignerFormly>{
      form: new FormGroup({}),
      options: {},
      formFields: cloneDeep(fields),
      fields: cloneDeep(fields),
    });
  }

  fix(arr: FormsDesignerFormly[]) {
    const newarr: FormsDesignerFormly[] = [];
    arr.map(el => newarr.push({
      form: new FormGroup({}),
      options: {},
      formFields: cloneDeep(el.fields),
      fields: cloneDeep(el.fields),
    })
    );
    return newarr;
  }

  drop(event: CdkDragDrop<FormsDesignerFormly[]>) {
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
