import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { CommonFormComponent } from '@core/components/templates/common-form/common-form.component';
import { IFormModal } from '@core/models/template/form-modal-data.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private dialogRef: ComponentRef<CommonFormComponent>;
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
    private appRef: ApplicationRef,) { }

  showForm(data: IFormModal): void {
    const factory = this.resolver.resolveComponentFactory(CommonFormComponent);
    const component = factory.create(this.injector);
    component.instance.data = data;
    this.appRef.attachView(component.hostView);
    const domElem = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.dialogRef = component;
  }

  removeFormComponentFromBody(): void {
    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
  }
}
