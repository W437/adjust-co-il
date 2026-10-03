// Topical internal links: for each post, the treatments and articles a reader
// is most likely to want next. Keeps link equity flowing between blog and
// service pages (services already link to their own related posts).
export const RELATED = {
  'understanding-back-pain': { services: ['classic-chiropractic', 'yoga-based-rehabilitation', 'posture-improvement'], posts: ['sciatica-relief-without-surgery', 'herniated-disc-treatment-chiropractic', 'sleeping-positions-back-pain'] },
  'posture-digital-age': { services: ['posture-improvement', 'fascia-release'], posts: ['understanding-back-pain', 'sleeping-positions-back-pain', 'neck-pain-tension-headaches'] },
  'sports-injury-recovery': { services: ['dry-needling-ims', 'kinesio-neurodynamic-taping', 'fascia-release'], posts: ['whiplash-car-accident-recovery', 'yoga-and-chiropractic', 'how-many-chiropractic-sessions-needed'] },
  'sleeping-positions-back-pain': { services: ['posture-improvement', 'classic-chiropractic'], posts: ['understanding-back-pain', 'pregnancy-back-pain', 'posture-digital-age'] },
  'yoga-and-chiropractic': { services: ['yoga-based-rehabilitation', 'posture-improvement'], posts: ['understanding-back-pain', 'sports-injury-recovery', 'posture-digital-age'] },
  'pregnancy-back-pain': { services: ['classic-chiropractic', 'yoga-based-rehabilitation', 'kinesio-neurodynamic-taping'], posts: ['sleeping-positions-back-pain', 'is-chiropractic-safe-myths', 'understanding-back-pain'] },
  'what-is-a-chiropractor': { services: ['classic-chiropractic'], posts: ['your-first-chiropractic-appointment', 'how-to-choose-a-chiropractor', 'chiropractor-vs-osteopath-vs-physiotherapist'] },
  'chiropractor-vs-osteopath-vs-physiotherapist': { services: ['classic-chiropractic', 'yoga-based-rehabilitation'], posts: ['what-is-a-chiropractor', 'how-to-choose-a-chiropractor', 'is-chiropractic-safe-myths'] },
  'how-to-choose-a-chiropractor': { services: ['classic-chiropractic'], posts: ['your-first-chiropractic-appointment', 'chiropractor-vs-osteopath-vs-physiotherapist', 'is-chiropractic-safe-myths'] },
  'is-chiropractic-safe-myths': { services: ['classic-chiropractic'], posts: ['what-is-a-chiropractor', 'your-first-chiropractic-appointment', 'how-many-chiropractic-sessions-needed'] },
  'your-first-chiropractic-appointment': { services: ['classic-chiropractic'], posts: ['what-is-a-chiropractor', 'how-many-chiropractic-sessions-needed', 'how-to-choose-a-chiropractor'] },
  'sciatica-relief-without-surgery': { services: ['classic-chiropractic', 'dry-needling-ims'], posts: ['herniated-disc-treatment-chiropractic', 'understanding-back-pain', 'how-many-chiropractic-sessions-needed'] },
  'herniated-disc-treatment-chiropractic': { services: ['classic-chiropractic', 'yoga-based-rehabilitation'], posts: ['sciatica-relief-without-surgery', 'understanding-back-pain', 'how-many-chiropractic-sessions-needed'] },
  'neck-pain-tension-headaches': { services: ['classic-chiropractic', 'dry-needling-ims', 'posture-improvement'], posts: ['posture-digital-age', 'whiplash-car-accident-recovery', 'understanding-back-pain'] },
  'whiplash-car-accident-recovery': { services: ['classic-chiropractic', 'dry-needling-ims', 'kinesio-neurodynamic-taping'], posts: ['neck-pain-tension-headaches', 'sports-injury-recovery', 'how-many-chiropractic-sessions-needed'] },
  'how-many-chiropractic-sessions-needed': { services: ['classic-chiropractic'], posts: ['your-first-chiropractic-appointment', 'herniated-disc-treatment-chiropractic', 'sciatica-relief-without-surgery'] },
};
