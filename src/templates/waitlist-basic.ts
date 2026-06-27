import { Template } from '../types';

export const waitlistBasicTemplate: Template = {
  id: 'waitlist-basic',
  name: 'Waitlist Classic',
  type: 'waitlist',
  thumbnail: '',
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      sections: [
        { id: 'sec-hero', component: 'wl-hero', defaultAttributes: {
          headline: 'The Inner Circle Is Currently Closed',
          subheadline: "We're not accepting new applications right now, but join the waitlist below to be first in line when spots open up.",
          bgColor: '#000000',
          textColor: '#ffffff',
          mutedColor: '#d4d4d4',
          gradientFrom: '#ffffff',
          gradientTo: '#919191'
        }},
        { id: 'sec-wl-form', component: 'wl-form', defaultAttributes: {
          headline: 'Join the Waitlist',
          bgColor: '#000000',
          accentColor: '#39ff14',
          cardBorder: 'rgba(57, 255, 20, 0.3)'
        }},
        { id: 'sec-testimonials', component: 'testimonials', defaultAttributes: {
          headline: "Interviews with the Inner Circle:",
          bgColor: '#000000',
          textColor: '#ffffff'
        }},
        { id: 'sec-wins', component: 'wins-section', defaultAttributes: {
          headline: 'More Inner Circle Wins:',
          bgColor: '#000000',
          textColor: '#ffffff'
        }},
        { id: 'sec-cta', component: 'cta-section', defaultAttributes: {
          buttonText: 'Get Started Now',
          buttonColor: '#39ff14',
          bgColor: '#000000'
        }},
        { id: 'sec-footer', component: 'wl-footer', defaultAttributes: {
          text: 'Built using clyro',
          link: 'https://clyro.io/',
          bgColor: '#000000'
        }},
      ]
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      slug: '/thank-you',
      sections: [
        { id: 'sec-thanks', component: 'thank-you', defaultAttributes: {
          headline: "You're on the Waitlist!",
          subheadline: "You Just Applied to the Waitlist. Check your email for confirmation. We'll notify you when spots open up.",
          bgColor: '#000000',
          gradientFrom: '#ffffff',
          gradientTo: '#919191'
        }}
      ]
    }
  ]
};
