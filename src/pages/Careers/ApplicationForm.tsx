import { useState } from 'react'
import styles from './ApplicationForm.module.css'

export default function ApplicationForm({ jobTitle, jobId }: { jobTitle: string; jobId: string }) {
  const [state, setState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const next: Record<string, string> = {}
    const required = ['name', 'email', 'role', 'portfolio']
    for (const k of required) {
      if (!String(data.get(k) || '').trim()) next[k] = 'Required'
    }
    setErrors(next)
    if (Object.keys(next).length) return

    setState('submitting')
    // TODO: wire to a real endpoint (Formspree, Resend, or backend) — out of scope here.
    await new Promise((r) => setTimeout(r, 800))
    console.info('[application]', { jobId, ...Object.fromEntries(data) })
    setState('sent')
    form.reset()
  }

  if (state === 'sent') {
    return (
      <div className={styles.success}>
        <h4>Application received ✨</h4>
        <p>Thanks for applying to {jobTitle}. We'll review and get back within 5 business days.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h4 className="mono">Apply for this role</h4>
      <input type="hidden" name="jobId" value={jobId} />
      <div className={styles.row}>
        <Field label="Full name *" name="name" error={errors.name} />
        <Field label="Email *" name="email" type="email" error={errors.email} />
      </div>
      <div className={styles.row}>
        <Field label="Current role / company" name="role" error={errors.role} />
        <Field label="Portfolio / LinkedIn URL *" name="portfolio" type="url" error={errors.portfolio} />
      </div>
      <div className={styles.full}>
        <label className={styles.label}>Anything else?</label>
        <textarea name="note" rows={3} className={styles.input} placeholder="Tell us about your work, what excites you, etc." />
      </div>
      <button type="submit" className={styles.submit} disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Sending...' : 'Submit application'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </button>
    </form>
  )
}

function Field({ label, name, type = 'text', error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input type={type} name={name} className={`${styles.input} ${error ? styles.inputError : ''}`} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}