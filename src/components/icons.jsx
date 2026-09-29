const Svg = ({ children, className, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
    {children}
  </svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></Svg>
);
export const CalendarIcon = (p) => (
  <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></Svg>
);
export const ChatIcon = (p) => (
  <Svg {...p}><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5z" /></Svg>
);
export const PinIcon = (p) => (
  <Svg {...p}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.6" /></Svg>
);
export const MailIcon = (p) => (
  <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></Svg>
);
export const ArrowIcon = ({ className = 'arr', ...p }) => (
  <Svg className={className} strokeWidth="2.2" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const SunIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>
);
export const MoonIcon = (p) => (
  <Svg {...p}><path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a6.6 6.6 0 0 0 10.6 10.6z" /></Svg>
);
export const MenuIcon = (p) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);
export const CloseIcon = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);

export const SpineDots = ({ className }) => (
  <svg className={className} viewBox="0 0 20 60" aria-hidden="true">
    <circle cx="13" cy="4" r="3.2" fill="#3cb4a0" /><circle cx="9" cy="12" r="4" fill="#2aa3a8" />
    <circle cx="6" cy="21" r="4.6" fill="#2893b3" /><circle cx="6" cy="30" r="4.4" fill="#2a84ba" />
    <circle cx="9" cy="38.5" r="4" fill="#3276c0" /><circle cx="11" cy="46.5" r="3.6" fill="#4468c6" />
    <circle cx="9" cy="53.5" r="3" fill="#5561cb" /><circle cx="5" cy="58.5" r="1.8" fill="#6560d0" />
  </svg>
);
