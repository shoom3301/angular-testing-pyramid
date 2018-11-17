import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export class PageObject<T> {
  constructor(protected fixture: ComponentFixture<T>) {
  }

  get debugElement(): DebugElement {
    return this.fixture.debugElement;
  }

  getElementBySelector(selector: string, element?: DebugElement): DebugElement {
    const debugElement = element || this.debugElement;

    return debugElement.query(By.css(selector));
  }

  getElementsBySelector(selector: string, element?: DebugElement): DebugElement[] {
    const debugElement = element || this.debugElement;

    return debugElement.queryAll(By.css(selector));
  }

  triggerClick(selector: string | DebugElement, event: Event = new MouseEvent('click')) {
    const element = this.resolveSelector(selector);

    element.nativeElement.click();
    this.fixture.detectChanges();
  }

  getInputText(selector: string | DebugElement): string {
    const element = this.resolveSelector(selector);

    return element && element.nativeElement
      ? element.nativeElement.value
      : '';
  }

  getElementText(selector: string | DebugElement): string {
    const element = this.resolveSelector(selector);

    return element && element.nativeElement
      ? element.nativeElement.textContent
      : '';
  }

  setInputValue(selector: string | DebugElement, value: string) {
    const element = this.resolveSelector(selector);
    const input = element.nativeElement;

    input.value = value;
    input.dispatchEvent(new Event('input'));

    this.fixture.detectChanges();

  }

  private resolveSelector(selector: string | DebugElement): DebugElement {
    return typeof selector === 'string'
      ? this.getElementBySelector(selector as string)
      : (selector as DebugElement);
  }
}
