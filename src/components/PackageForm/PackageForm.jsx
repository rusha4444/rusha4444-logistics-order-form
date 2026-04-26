// PackageForm.jsx - Represents ONE package card in the form
// This component is rendered multiple times (once per package) inside OrderForm
// Each instance gets its own "pkg" data and its own "onChange"/"onRemove" functions

import FormField from '../FormField/FormField.jsx'
import styles from './PackageForm.module.css'

export default function PackageForm({ pkg, index, onChange, onRemove, canRemove }) {
  // "pkg" = the package object { id, label, weight, length, width, height, declaredValue }
  // "index" = package number (1, 2, 3...) for display
  // "onChange(field, value)" = function from parent to update this package
  // "canRemove" = false when there's only 1 package (must have at least 1)

  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.packageTitle}>
          <span className={styles.packageIcon}>📦</span>
          <span className={styles.packageLabel}>Package {index}</span>
        </div>
        {/* Only show Remove button if there are 2+ packages */}
        {canRemove && (
          <button
            type="button"
            className={styles.removeBtn}
            onClick={onRemove}
            title="Remove this package"
          >
            ✕ Remove
          </button>
        )}
      </div>

      {/* Package Name */}
      <div className={styles.fullRow}>
        <FormField
          label="Package Label / Name"
          value={pkg.label}
          onChange={(val) => onChange('label', val)}
          placeholder="e.g. Electronics Box A"
        />
      </div>

      {/* Dimensions row: Length, Width, Height */}
      <div className={styles.dimRow}>
        <FormField
          label="Length (cm)"
          type="number"
          value={pkg.length}
          onChange={(val) => onChange('length', val)}
          placeholder="0"
        />
        <FormField
          label="Width (cm)"
          type="number"
          value={pkg.width}
          onChange={(val) => onChange('width', val)}
          placeholder="0"
        />
        <FormField
          label="Height (cm)"
          type="number"
          value={pkg.height}
          onChange={(val) => onChange('height', val)}
          placeholder="0"
        />
      </div>

      {/* Weight + Declared Value row */}
      <div className={styles.twoCol}>
        <FormField
          label="Weight (kg)"
          type="number"
          value={pkg.weight}
          onChange={(val) => onChange('weight', val)}
          placeholder="0.00"
        />
        <FormField
          label="Declared Value (₹)"
          type="number"
          value={pkg.declaredValue}
          onChange={(val) => onChange('declaredValue', val)}
          placeholder="0"
        />
      </div>
    </div>
  )
}
