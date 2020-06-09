import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DialogComponent } from '@core/components/templates/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef: ComponentRef<DialogComponent>;
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector,
    private appRef: ApplicationRef,) { }

  showDialog(data): void {
    const factory = this.resolver.resolveComponentFactory(DialogComponent);
    const component = factory.create(this.injector);
    component.instance.data = data;
    this.appRef.attachView(component.hostView);
    const domElem = (component.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.dialogRef = component;
  }

  removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
  }
}
