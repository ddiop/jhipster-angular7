/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EvenementService } from 'app/entities/evenement/evenement.service';
import { IEvenement, Evenement } from 'app/shared/model/evenement.model';

describe('Service Tests', () => {
    describe('Evenement Service', () => {
        let injector: TestBed;
        let service: EvenementService;
        let httpMock: HttpTestingController;
        let elemDefault: IEvenement;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(EvenementService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Evenement(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateDepart: currentDate.format(DATE_FORMAT),
                        dateRetour: currentDate.format(DATE_FORMAT),
                        dateReflexion: currentDate.format(DATE_FORMAT),
                        dateCreation: currentDate.format(DATE_FORMAT)
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

            it('should create a Evenement', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateDepart: currentDate.format(DATE_FORMAT),
                        dateRetour: currentDate.format(DATE_FORMAT),
                        dateReflexion: currentDate.format(DATE_FORMAT),
                        dateCreation: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDepart: currentDate,
                        dateRetour: currentDate,
                        dateReflexion: currentDate,
                        dateCreation: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Evenement(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Evenement', async () => {
                const returnedFromService = Object.assign(
                    {
                        nom: 'BBBBBB',
                        detail: 'BBBBBB',
                        lieuDepart: 'BBBBBB',
                        lieuDestination: 'BBBBBB',
                        dateDepart: currentDate.format(DATE_FORMAT),
                        dateRetour: currentDate.format(DATE_FORMAT),
                        dateReflexion: currentDate.format(DATE_FORMAT),
                        dateCreation: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateDepart: currentDate,
                        dateRetour: currentDate,
                        dateReflexion: currentDate,
                        dateCreation: currentDate
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

            it('should return a list of Evenement', async () => {
                const returnedFromService = Object.assign(
                    {
                        nom: 'BBBBBB',
                        detail: 'BBBBBB',
                        lieuDepart: 'BBBBBB',
                        lieuDestination: 'BBBBBB',
                        dateDepart: currentDate.format(DATE_FORMAT),
                        dateRetour: currentDate.format(DATE_FORMAT),
                        dateReflexion: currentDate.format(DATE_FORMAT),
                        dateCreation: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateDepart: currentDate,
                        dateRetour: currentDate,
                        dateReflexion: currentDate,
                        dateCreation: currentDate
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

            it('should delete a Evenement', async () => {
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
