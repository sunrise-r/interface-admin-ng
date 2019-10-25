import { getTestBed, TestBed } from '@angular/core/testing';
import { FormErrorsStringifyService } from './form-errors-stringify.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../iad-shared.module';

describe('FormErrorsStringifyServiceTest', () => {
    let injector: TestBed;
    let service: FormErrorsStringifyService;
    let fb: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }),
            ]
        });
        injector = getTestBed();
        service = injector.get(FormErrorsStringifyService);
        fb = injector.get(FormBuilder);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Service methods', () => {
        it('should collect errors', () => {
            // const nextSpy = spyOn(service.errors, 'next');
            service.errors.subscribe((res) => {
                console.log(res);
                // expect(res).toEqual(dummyUserListResponse);
            });
            const form = fb.group({
                firstName: ['abc', [Validators.min(5)]],
                lastName: ['def', [Validators.min(5)]],
                email: ['ghi', [Validators.min(5), Validators.email]],
                address: fb.group({
                    street: [null, Validators.required],
                    city: [''],
                    state: [''],
                    zip: ['']
                })
            });

            service.addFormErrors(form, {
                firstName: 'First name',
                lastName: 'Last name',
                email: 'Email',
                address: 'Address',
                street: 'Street',
                city: 'City',
                state: 'State',
                zip: 'Zip'}, 'prefix.');

            expect(nextSpy).toHaveBeenCalled();
        });
    });
});
