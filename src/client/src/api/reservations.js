const RESERVATIONS_ENDPOINT = `${process.env.REACT_APP_API_HOST}api/reservations`

export const getAllReservations = async () => {
  const response = await fetch(RESERVATIONS_ENDPOINT);
  const reservations = await response.json();
  return reservations.map(reservation => {
    reservation.date = new Date(reservation.date);
    return reservation;
  });
}