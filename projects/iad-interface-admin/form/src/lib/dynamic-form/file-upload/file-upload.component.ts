import {Component, OnInit, forwardRef, Input, ElementRef, Renderer2, ViewChild, HostListener, Output, EventEmitter} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const FILE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploadComponent),
    multi: true
};

@Component({
    selector: 'iad-file-upload',
    template: `<input
        #file
        [ngClass]="['form-control-file', styleClass ? styleClass : '']"
        [id]="inputId"
        [readonly]="inputReadonly"
        (change)="handleFileInput($event.target.files)"
        (blur)="onInputBlur($event)"
        type="file">
        <button class="btn btn-primary" type="button">{{'fileInput.selectFile' | translate}}</button>
        <span class="file-upload-text">{{fileName || ('fileInput.fileNotSelected' | translate)}}</span>`,
    providers: [FILE_VALUE_ACCESSOR]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
    @Input() inputId: string;

    @Input() inputReadonly: string;

    @Input() styleClass: string;

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @ViewChild('file') file: ElementRef;

    fileName = '';

    fileToUpload: File = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    onChange = (event: any) => {};
    onTouched = () => {};

    ngOnInit() {
        this.renderer.setProperty(this.el.nativeElement, 'tabindex', '0');
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {}

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
        this.onChange(obj);
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        if (this.fileToUpload) {
            this.fileName = this.fileToUpload.name;
        }
        this.writeValue(this.fileToUpload);
        this.onTouched();
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.file.nativeElement.click();
    }

    onInputBlur(event) {
      this.onTouched();
      this.onBlur.emit(event);
    }
}
