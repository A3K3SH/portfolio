import React, { useRef } from 'react';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    
    fetch('https://usebasin.com/f/1751f5555dd6', {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        console.log('SUCCESS!');
        form.current.reset();
      })
      .catch((error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
