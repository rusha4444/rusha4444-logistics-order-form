// OrderForm.jsx - The LEFT PANEL. Contains all form sections.
// It receives data (props) from App.jsx and calls the handlers when user types

import FormField from '../FormField/FormField.jsx'
import PackageForm from '../PackageForm/PackageForm.jsx'
import styles from './OrderForm.module.css'

export default function OrderForm({
  // All the current values
  orderId, shipmentDate, deliveryType,
  consignor, consignee, packages,
  fragile, insured,
  // All the updater functions (called "handlers" or "callbacks")
  onShipmentDateChange, onDeliveryTypeChange,
  onConsignorChange, onConsigneeChange,
  onPackageChange, onAddPackage, onRemovePackage,
  onFragileChange, onInsuredChange,
}) {

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>New Shipment Order</h1>
        <p className={styles.formSubtitle}>Fill in all details to create a shipment</p>
      </div>

      {/* =============================================
          SECTION 1: Shipment Details
          ============================================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNum}>01</span>
          Shipment Details
        </h2>

        <div className={styles.twoCol}>
          <FormField
            label="Order ID"
            value={orderId}
            readOnly={true}
            placeholder="Auto-generated"
          />

          <FormField
            label="Shipment Date"
            type="date"
            value={shipmentDate}
            onChange={onShipmentDateChange}
          />
        </div>

        {/* Delivery Type - Custom styled radio buttons */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Delivery Type</label>
          <div className={styles.deliveryOptions}>

            <label className={`${styles.deliveryOption} ${deliveryType === 'standard' ? styles.selected : ''}`}>
              <input
                type="radio"
                name="deliveryType"
                value="standard"
                checked={deliveryType === 'standard'}
                onChange={() => onDeliveryTypeChange('standard')}
                className={styles.hiddenRadio}
                // We hide the ugly default radio button with CSS
                // and style the parent <label> instead
              />
              <span className={styles.deliveryIcon}>🚚</span>
              <div>
                <div className={styles.deliveryName}>Standard</div>
                <div className={styles.deliveryDesc}>3–5 Business Days</div>
              </div>
            </label>

            <label className={`${styles.deliveryOption} ${deliveryType === 'express' ? styles.selected : ''}`}>
              <input
                type="radio"
                name="deliveryType"
                value="express"
                checked={deliveryType === 'express'}
                onChange={() => onDeliveryTypeChange('express')}
                className={styles.hiddenRadio}
              />
              <span className={styles.deliveryIcon}>⚡</span>
              <div>
                <div className={styles.deliveryName}>Express</div>
                <div className={styles.deliveryDesc}>Next Day Delivery</div>
              </div>
            </label>

          </div>
        </div>
      </section>

      {/* =============================================
          SECTION 2: Consignor (Sender)
          ============================================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNum}>02</span>
          Consignor <span className={styles.sectionHint}>(Sender)</span>
        </h2>

        <div className={styles.fullRow}>
          <FormField
            label="Full Name"
            value={consignor.name}
            onChange={(val) => onConsignorChange('name', val)}
            placeholder="e.g. Rajesh Kumar"
          />
        </div>

        <div className={styles.fullRow}>
          <FormField
            label="Address"
            value={consignor.address}
            onChange={(val) => onConsignorChange('address', val)}
            placeholder="Street address, building name"
          />
        </div>

        <div className={styles.twoCol}>
          <FormField
            label="City"
            value={consignor.city}
            onChange={(val) => onConsignorChange('city', val)}
            placeholder="e.g. Mumbai"
          />
          <FormField
            label="Pincode"
            type="number"
            value={consignor.pincode}
            onChange={(val) => onConsignorChange('pincode', val)}
            placeholder="400001"
          />
        </div>
      </section>

      {/* =============================================
          SECTION 3: Consignee (Receiver)
          ============================================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNum}>03</span>
          Consignee <span className={styles.sectionHint}>(Receiver)</span>
        </h2>

        <div className={styles.fullRow}>
          <FormField
            label="Full Name"
            value={consignee.name}
            onChange={(val) => onConsigneeChange('name', val)}
            placeholder="e.g. Priya Sharma"
          />
        </div>

        <div className={styles.fullRow}>
          <FormField
            label="Address"
            value={consignee.address}
            onChange={(val) => onConsigneeChange('address', val)}
            placeholder="Street address, building name"
          />
        </div>

        <div className={styles.twoCol}>
          <FormField
            label="City"
            value={consignee.city}
            onChange={(val) => onConsigneeChange('city', val)}
            placeholder="e.g. Delhi"
          />
          <FormField
            label="Pincode"
            type="number"
            value={consignee.pincode}
            onChange={(val) => onConsigneeChange('pincode', val)}
            placeholder="110001"
          />
        </div>
      </section>

      {/* =============================================
          SECTION 4: Packages
          ============================================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeaderRow}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>04</span>
            Packages
            <span className={styles.packageCount}>{packages.length}</span>
          </h2>
          <button
            type="button"
            className={styles.addBtn}
            onClick={onAddPackage}
          >
            + Add Package
          </button>
        </div>

        {/* Render a PackageForm card for EACH package in the array */}
        {/* .map() is like a for-loop that returns JSX for each item */}
        <div className={styles.packagesList}>
          {packages.map((pkg, index) => (
            <PackageForm
              key={pkg.id}               // React needs a unique "key" for lists
              pkg={pkg}
              index={index + 1}          // Show as 1, 2, 3... (not 0, 1, 2)
              onChange={(field, val) => onPackageChange(pkg.id, field, val)}
              onRemove={() => onRemovePackage(pkg.id)}
              canRemove={packages.length > 1}
            />
          ))}
        </div>
      </section>

      {/* =============================================
          SECTION 5: Additional Options
          ============================================= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNum}>05</span>
          Additional Options
        </h2>

        <div className={styles.checkboxGroup}>
          {/* Fragile checkbox */}
          <label className={`${styles.checkCard} ${fragile ? styles.checkCardActive : ''}`}>
            <input
              type="checkbox"
              checked={fragile}
              onChange={(e) => onFragileChange(e.target.checked)}
              // e.target.checked gives us true/false
              className={styles.hiddenCheck}
            />
            <span className={styles.checkIcon}>🫙</span>
            <div className={styles.checkText}>
              <span className={styles.checkTitle}>Fragile</span>
              <span className={styles.checkDesc}>Handle with extra care</span>
            </div>
            <span className={`${styles.checkmark} ${fragile ? styles.checked : ''}`}>
              {fragile ? '✓' : ''}
            </span>
          </label>

          {/* Insurance checkbox */}
          <label className={`${styles.checkCard} ${insured ? styles.checkCardActive : ''}`}>
            <input
              type="checkbox"
              checked={insured}
              onChange={(e) => onInsuredChange(e.target.checked)}
              className={styles.hiddenCheck}
            />
            <span className={styles.checkIcon}>🛡️</span>
            <div className={styles.checkText}>
              <span className={styles.checkTitle}>Insurance Required</span>
              <span className={styles.checkDesc}>Cover declared value</span>
            </div>
            <span className={`${styles.checkmark} ${insured ? styles.checked : ''}`}>
              {insured ? '✓' : ''}
            </span>
          </label>
        </div>
      </section>
    </div>
  )
}
