import understandingBackPain from './posts/understanding-back-pain';
import postureDigitalAge from './posts/posture-digital-age';
import sportsInjuryRecovery from './posts/sports-injury-recovery';
import sleepingPositions from './posts/sleeping-positions-back-pain';
import yogaAndChiropractic from './posts/yoga-and-chiropractic';
import pregnancyBackPain from './posts/pregnancy-back-pain';
import whatIsAChiropractor from './posts/what-is-a-chiropractor';
import chiropractorVsOsteopath from './posts/chiropractor-vs-osteopath-vs-physiotherapist';
import howToChooseChiropractor from './posts/how-to-choose-a-chiropractor';
import isChiropracticSafeMyths from './posts/is-chiropractic-safe-myths';
import firstAppointment from './posts/your-first-chiropractic-appointment';
import sciaticaWithoutSurgery from './posts/sciatica-relief-without-surgery';
import herniatedDiscTreatment from './posts/herniated-disc-treatment-chiropractic';
import neckPainHeadaches from './posts/neck-pain-tension-headaches';
import whiplashRecovery from './posts/whiplash-car-accident-recovery';
import howManySessions from './posts/how-many-chiropractic-sessions-needed';

export const posts = [
  howManySessions,
  whiplashRecovery,
  neckPainHeadaches,
  herniatedDiscTreatment,
  sciaticaWithoutSurgery,
  firstAppointment,
  isChiropracticSafeMyths,
  howToChooseChiropractor,
  chiropractorVsOsteopath,
  whatIsAChiropractor,
  sleepingPositions,
  yogaAndChiropractic,
  pregnancyBackPain,
  sportsInjuryRecovery,
  postureDigitalAge,
  understandingBackPain,
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}
