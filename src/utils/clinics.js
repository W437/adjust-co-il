// Clinic data shared by the home Locations section and the baby page.
// Reception hours as given by the client. Days: 0 = Sunday.
export const CLINICS = [
  {
    id: 'ta',
    waze: 'https://www.waze.com/ul?ll=32.10796593277039,34.79845703185863&navigate=yes',
    address: 'contact.centerAddress',
    hours: [
      { day: 0, time: '14:00–20:00' },
      { day: 2, time: '08:00–14:00' },
    ],
  },
  {
    id: 'tu',
    waze: 'https://www.waze.com/ul?ll=32.92684384968411,35.2425406270441&navigate=yes',
    address: 'contact.northAddress',
    hours: [
      { day: 1, time: '08:00–14:00, 16:00–20:00' },
      { day: 3, time: '08:00–14:00, 16:00–20:00' },
      { day: 5, time: '07:00–14:00' },
    ],
  },
];

export const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
