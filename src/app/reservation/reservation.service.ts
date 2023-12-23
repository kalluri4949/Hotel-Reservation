import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    let serializedReservations = localStorage.getItem('reservations');
    this.reservations = serializedReservations
      ? JSON.parse(serializedReservations)
      : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = new Date().toString();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === id
    );
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === id
    );
    this.reservations[index] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
