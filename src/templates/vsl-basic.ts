import { Template } from '../types';

export const vslBasicTemplate: Template = {
  id: 'vsl-basic',
  name: 'VSL Classic',
  type: 'vsl',
  thumbnail: '',
  pages: [
    {
      id: 'home',
      name: 'Home',
      slug: '/',
      sections: [
        { id: 'sec-hero', component: 'vsl-hero', defaultAttributes: {
          headline: 'Transform Your Life Today',
          subheadline: 'Watch the video below to discover the proven system',
          ctaText: 'Apply Now',
          ctaLink: '',
          bgColor: '#0f172a',
          overlay: 'rgba(0,0,0,0.5)'
        }},
        { id: 'sec-video', component: 'video-player', defaultAttributes: {
          videoUrl: 'https://www.youtube.com/watch?v=example',
          autoplay: false,
          loop: false,
          coverImage: ''
        }},
        { id: 'sec-form', component: 'app-form', defaultAttributes: {
          fields: [
            { id: 'name', label: 'Full Name', type: 'text', required: true },
            { id: 'email', label: 'Email Address', type: 'email', required: true },
            { id: 'phone', label: 'Phone Number', type: 'tel', required: false }
          ],
          buttonText: 'Submit Application',
          successMessage: 'Thank you! We will be in touch.',
          bgColor: '#ffffff'
        }},
        { id: 'sec-contact', component: 'contact-info', defaultAttributes: {
          phone: '+1 (555) 123-4567',
          email: 'info@example.com',
          address: '123 Main St, City, State',
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
          headline: 'Thank You!',
          subheadline: 'Your application has been received. We will contact you within 24 hours.',
          redirectUrl: '',
          redirectDelay: 0,
          bgColor: '#0f172a'
        }}
      ]
    }
  ]
};
