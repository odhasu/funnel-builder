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
          headline: 'Join the Waitlist',
          subheadline: 'Be the first to know when we launch. Exclusive early access for waitlist members.',
          bgColor: '#0f172a'
        }},
        { id: 'sec-wl-form', component: 'wl-form', defaultAttributes: {
          headline: 'Secure Your Spot',
          emailPlaceholder: 'Enter your best email',
          buttonText: 'Join Waitlist',
          incentiveText: 'Early access bonus: 50% off lifetime',
          bgColor: '#ffffff'
        }},
        { id: 'sec-contact', component: 'contact-info', defaultAttributes: {
          phone: '',
          email: 'hello@example.com',
          address: '',
          socialLinks: []
        }},
      ]
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      slug: '/thank-you',
      sections: [
        { id: 'sec-thanks', component: 'thank-you', defaultAttributes: {
          headline: "You're on the list!",
          subheadline: 'Check your email for confirmation. We will notify you when we launch.',
          redirectUrl: '',
          redirectDelay: 0,
          bgColor: '#0f172a'
        }}
      ]
    }
  ]
};
