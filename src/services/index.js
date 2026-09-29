import classicChiropractic from './data/classic-chiropractic.js';
import dryNeedlingIms from './data/dry-needling-ims.js';
import kinesioNeurodynamicTaping from './data/kinesio-neurodynamic-taping.js';
import yogaBasedRehabilitation from './data/yoga-based-rehabilitation.js';
import fasciaRelease from './data/fascia-release.js';
import postureImprovement from './data/posture-improvement.js';

export const serviceSlugs = [
  'classic-chiropractic',
  'dry-needling-ims',
  'kinesio-neurodynamic-taping',
  'yoga-based-rehabilitation',
  'fascia-release',
  'posture-improvement',
];

export const services = [
  classicChiropractic,
  dryNeedlingIms,
  kinesioNeurodynamicTaping,
  yogaBasedRehabilitation,
  fasciaRelease,
  postureImprovement,
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) || null;
}
