import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next: Record<string, string> = {}
    if (!String(data.get('name') || '').trim()) next.name = 'Required'
    if (!String(data.get('email') || '').trim()) next.email = 'Required'
    else if (!/^.+@.+\..+$/.test(String(data.get('email')))) next.email = 'Enter a valid email'
    if (!String(data.get('message') || '').trim()) next.message = 'Required'
    setErrors(next)
    if (Object.keys(next).length) return

    setState('sending')
    // TODO: wire to Formspree / Resend / backend.
    await new Promise((r) => setTimeout(r, 800))
    console.info('[contact]', Object.fromEntries(data))
    setState('sent')
    form.reset()
  }

  if (state === 'sent') {
    return (
      <div className={styles.success}>
        <h3>Message received ✨</h3>
        <p>We'll reply within 24 hours. If it's urgent, ping us on WhatsApp below.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Name *</label>
          <input name="name" type="text" className={`${styles.input} ${errors.name ? styles.err : ''}`} placeholder="Your name" />
          {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label>Email *</label>
          <input name="email" type="email" className={`${styles.input} ${errors.email ? styles.err : ''}`} placeholder="you@company.com" />
          {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Company</label>
          <input name="company" type="text" className={styles.input} placeholder="Company (optional)" />
        </div>
        <div className={styles.field}>
          <label>Budget</label>
          <select name="budget" className={styles.input}>
            <option value="">Select budget range</option>
            <option>Under $25k</option>
            <option>$25k – $75k</option>
            <option>$75k – $200k</option>
            <option>$200k+</option>
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label>Project *</label>
        <textarea name="message" rows={5} className={`${styles.input} ${errors.message ? styles.err : ''}`} placeholder="Tell us about your project — the more, the better." />
        {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
      </div>
      <button type="submit" className={styles.submit} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send message'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </button>
    </form>
  )
}