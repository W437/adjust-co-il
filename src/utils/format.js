export function fill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
}

export const PHONE_DISPLAY = '053-276-7776';
export const PHONE_TEL = 'tel:+972532767776';
export const WHATSAPP_NUMBER = '972532767776';
export const EMAIL = 'victorduani@gmail.com';

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function hoursFor(day) {
  if (day <= 4) return [480, 1140];
  if (day === 5) return [480, 780];
  return null;
}

function hhmm(m) {
  const h = Math.floor(m / 60);
  return `${h < 10 ? '0' : ''}${h}:${String(m % 60).padStart(2, '0')}`;
}

function israelNow() {
  const o = {};
  new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
    .formatToParts(new Date())
    .forEach((p) => { o[p.type] = p.value; });
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), mins: (Number(o.hour) % 24) * 60 + Number(o.minute) };
}

export function clinicStatus(t) {
  const now = israelNow();
  const today = hoursFor(now.day);
  if (today && now.mins >= today[0] && now.mins < today[1]) {
    return { open: true, day: now.day, text: fill(t('ui.openUntil'), { t: hhmm(today[1]) }) };
  }
  if (today && now.mins < today[0]) {
    return { open: false, day: now.day, text: fill(t('ui.opensToday'), { t: hhmm(today[0]) }) };
  }
  for (let d = 1; d <= 7; d++) {
    const nd = (now.day + d) % 7;
    const h = hoursFor(nd);
    if (h) {
      const text = d === 1
        ? fill(t('ui.opensTomorrow'), { t: hhmm(h[0]) })
        : fill(t('ui.opensDay'), { d: t('ui.days')[nd], t: hhmm(h[0]) });
      return { open: false, day: now.day, text };
    }
  }
  return { open: false, day: now.day, text: '' };
}
