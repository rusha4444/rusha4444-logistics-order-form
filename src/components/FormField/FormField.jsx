// FormField.jsx - A REUSABLE component for a label + input pair
// Instead of writing label+input HTML every time, we create this once
// and reuse it everywhere with different props

import styles from './FormField.module.css'

// Props (short for "properties") are how parent passes data to child
// Think of props like function arguments
export default function FormField({ label, type = 'text', value, onChange, placeholder, readOnly = false }) {
  return (
    <div className={styles.fieldGroup}>
      {/* The label tells the user what this input is for */}
      <label className={styles.label}>{label}</label>

      <input
        type={type}
        value={value}
        onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
        // e.target.value = whatever the user typed
        placeholder={placeholder || ''}
        readOnly={readOnly}
        className={`${styles.input} ${readOnly ? styles.readonly : ''}`}
        // Template literal ↑ combines two class names conditionally
      />
    </div>
  )
}
