'use client';

import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export function EmailJSInit() {
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    if (publicKey) {
      emailjs.init(publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS Public Key is missing. Make sure to set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your .env.local file');
    }
  }, []);

  return null;
}