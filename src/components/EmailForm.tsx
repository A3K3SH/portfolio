'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
 X,
 Mail,
 User,
 MessageSquare,
 Send,
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailForm: React.FC = () => {
 const form = useRef<HTMLFormElement>(null);
 const [isFormVisible, setIsFormVisible] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'swainaakash18@gmail.com';
 const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`;

 const toggleForm = () => setIsFormVisible(!isFormVisible);

 const sendEmail = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(form.current!);
  
  fetch('https://usebasin.com/f/1751f5555dd6', {
   method: 'POST',
   body: formData,
  })
   .then(() => {
    toast.success('Message sent! I will get back to you soon.');
    if (form.current) {
     form.current.reset();
    }
    setIsFormVisible(false);
   })
   .catch((error) => {
    console.error('Error sending email:', error);
    toast.error('Error: There was a problem sending your message. Please try again.');
   })
   .finally(() => {
    setIsSubmitting(false);
   });
 };

 // Close form on escape key
 useEffect(() => {
  const handleEsc = (event: KeyboardEvent) => {
   if (event.key === 'Escape' && isFormVisible) {
    setIsFormVisible(false);
   }
  };

  window.addEventListener('keydown', handleEsc);
  return () => window.removeEventListener('keydown', handleEsc);
 }, [isFormVisible]);

 return (
  <>
   <div className="flex flex-wrap items-center gap-3">
    <Button
     onClick={toggleForm}
     className="bg-theme-accent hover:bg-opacity-80 text-theme-primary text-sm py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-50 flex items-center gap-2"
    >
     <MessageSquare className="w-4 h-4" />
     Message Me
    </Button>

    <Button
     asChild
     className="bg-theme-primary/10 text-theme-primary border border-theme-primary/40 text-sm py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-theme-primary hover:text-theme-background focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-50 flex items-center gap-2"
    >
     <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer">
      <Send className="w-4 h-4" />
      Email Me
     </a>
    </Button>
   </div>

   <AnimatePresence>
    {isFormVisible && (
     <>
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.3 }}
       className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
       onClick={toggleForm}
      />
            <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
      >
      <Card className="w-full max-w-md bg-theme-accent text-theme-primary shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b20">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Send a Message
          </h2>
          <Button
          onClick={toggleForm}
          variant="ghost"
          size="icon"
          className="text-theme-primary hover:text-theme-secondary focus:outline-none"
          >
          <X className="h-6 w-6" />
          </Button>
        </div>
        </CardHeader>
        <CardContent className="p-6">
         <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="space-y-2">
           <Label
            htmlFor="user_name"
            className="text-sm font-medium flex items-center gap-1"
           >
            <User className="h-4 w-4" />
            Name
           </Label>
           <Input
            id="user_name"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="bg-theme-background bg-opacity-20 border-theme-background border-opacity-30 text-theme-primary placeholder:text-theme-primary placeholder:text-opacity-60 focus:border-theme-primary focus:ring-theme-primary"
           />
          </div>

          <div className="space-y-2">
           <Label
            htmlFor="user_email"
            className="text-sm font-medium flex items-center gap-1"
           >
            <Mail className="h-4 w-4" />
            Email
           </Label>
           <Input
            id="user_email"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            required
            className="bg-theme-background bg-opacity-20 border-theme-background border-opacity-30 text-theme-primary placeholder:text-theme-primary placeholder:text-opacity-60 focus:border-theme-primary focus:ring-theme-primary"
           />
          </div>

          <div className="space-y-2">
           <Label
            htmlFor="message"
            className="text-sm font-medium flex items-center gap-1"
           >
            <MessageSquare className="h-4 w-4" />
            Message
           </Label>
           <Textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            required
            className="bg-theme-background bg-opacity-20 border-theme-background border-opacity-30 text-theme-primary placeholder:text-theme-primary placeholder:text-opacity-60 focus:border-theme-primary focus:ring-theme-primary min-h-[120px]"
            rows={4}
           />
          </div>

          <Button
           type="submit"
           className="w-full bg-theme-primary hover:bg-theme-primary hover:bg-opacity-90 text-theme-background font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
           disabled={isSubmitting}
          >
           {isSubmitting ? (
            <>
             <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-theme-background"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
             >
              <circle
               className="opacity-25"
               cx="12"
               cy="12"
               r="10"
               stroke="currentColor"
               strokeWidth="4"
              ></circle>
              <path
               className="opacity-75"
               fill="currentColor"
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
             </svg>
             Sending...
            </>
           ) : (
            <>
             <Mail className="h-4 w-4" />
             Send Message
            </>
           )}
          </Button>
         </form>
        </CardContent>
       </Card>
      </motion.div>
     </>
    )}
   </AnimatePresence>
   <ToastContainer position="bottom-right" theme="dark" />
  </>
 );
};

export default EmailForm;
