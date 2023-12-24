import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  reservationId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    this.reservationId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.reservationId) {
      this.reservationService
        .getReservation(this.reservationId)
        ?.subscribe((reservation) => {
          if (reservation) {
            this.reservationForm.patchValue(reservation);
          }
        });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation = this.reservationForm.value;
      if (this.reservationId) {
        //update
        this.reservationService
          .updateReservation(this.reservationId, reservation)
          .subscribe(() => {
            console.log('update request processed');
          });
      } else {
        //add
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('add request processed');
        });
      }

      this.router.navigate(['/list']);
    }
  }
}
