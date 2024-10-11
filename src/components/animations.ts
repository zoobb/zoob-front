import {gsap} from 'gsap';
import TweenTarget = gsap.TweenTarget;
import Callback = gsap.Callback;

export const animateListEnter = (el: TweenTarget, done: Callback) => {
  gsap.from(el, {
    'height': 0,
    'opacity': 0,
    'duration': 0.5,
    'ease': 'power3.inOut',
    'onComplete': done,
  });
};
export const animateListLeave = (el: TweenTarget, done: Callback) => {
  gsap.to(el, {
    'height': 0,
    'opacity': 0,
    'duration': 0.5,
    'ease': 'power3.inOut',
    'onComplete': done,
  });
};
