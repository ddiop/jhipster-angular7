/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PersonneService } from 'app/entities/personne/personne.service';
import { IPersonne, Personne, CIVILITE, LANGUAGE } from 'app/shared/model/personne.model';

describe('Service Tests', () => {
    describe('Personne Service', () => {
        let injector: TestBed;
        let service: PersonneService;
        let httpMock: HttpTestingController;
        let elemDefault: IPersonne;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PersonneService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Personne(
                0,
                'AAAAAAA',
                CIVILITE.MR,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                0,
                false,
                currentDate,
                LANGUAGE.FR
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateNaissance: currentDate.format(DATE_FORMAT),
                        cguDateValidation: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Personne', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateNaissance: currentDate.format(DATE_FORMAT),
                        cguDateValidation: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateNaissance: currentDate,
                        cguDateValidation: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Personne(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Personne', async () => {
                const returnedFromService = Object.assign(
                    {
                        surnom: 'BBBBBB',
                        civilite: 'BBBBBB',
                        prenom: 'BBBBBB',
                        nom: 'BBBBBB',
                        mail: 'BBBBBB',
                        password: 'BBBBBB',
                        dateNaissance: currentDate.format(DATE_FORMAT),
                        cguVersion: 1,
                        cguValide: true,
                        cguDateValidation: currentDate.format(DATE_FORMAT),
                        langue: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateNaissance: currentDate,
                        cguDateValidation: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Personne', async () => {
                const returnedFromService = Object.assign(
                    {
                        surnom: 'BBBBBB',
                        civilite: 'BBBBBB',
                        prenom: 'BBBBBB',
                        nom: 'BBBBBB',
                        mail: 'BBBBBB',
                        password: 'BBBBBB',
                        dateNaissance: currentDate.format(DATE_FORMAT),
                        cguVersion: 1,
                        cguValide: true,
                        cguDateValidation: currentDate.format(DATE_FORMAT),
                        langue: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateNaissance: currentDate,
                        cguDateValidation: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Personne', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
