// App.jsx - The ROOT component. Think of it as the "boss" of the whole app.
// All the data (state) lives here and gets passed down to child components.

import { useState } from 'react'        // useState = React's way to store data that changes
import './index.css'                     // Only global CSS reset
import OrderForm from './components/OrderForm/OrderForm.jsx'
import ShipmentPreview from './components/ShipmentPreview/ShipmentPreview.jsx'
import styles from './App.module.css'   // CSS Module for this component

// --- HELPER: Generate a random Order ID like "ORD-2024-A7X3" ---
function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `ORD-${suffix}`
}

// --- HELPER: Create a blank package object ---
// We use this when the user clicks "Add Package"
function createEmptyPackage() {
  return {
    id: Date.now(),          // unique key for React lists
    label: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    declaredValue: '',
  }
}

// --- TODAY'S DATE in YYYY-MM-DD format (for the date input default) ---
function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export default function App() {
  // =========================================================
  // STATE - All the form data lives here as one big object
  // useState(initialValue) returns [currentValue, setterFunction]
  // When you call a setter, React re-renders the component
  // =========================================================

  const [orderId] = useState(generateOrderId)   // Auto-generated, never changes

  const [shipmentDate, setShipmentDate] = useState(getTodayString())
  const [deliveryType, setDeliveryType] = useState('standard')

  // Consignor = Sender
  const [consignor, setConsignor] = useState({ name: '', address: '', city: '', pincode: '' })

  // Consignee = Receiver
  const [consignee, setConsignee] = useState({ name: '', address: '', city: '', pincode: '' })

  // Packages array - starts with one empty package
  const [packages, setPackages] = useState([createEmptyPackage()])

  const [fragile, setFragile] = useState(false)
  const [insured, setInsured] = useState(false)

  // =========================================================
  // HANDLERS - Functions that update state
  // =========================================================

  // Generic handler for consignor fields
  // "field" is a dynamic key like "name", "city", etc.
  function handleConsignorChange(field, value) {
    setConsignor(prev => ({ ...prev, [field]: value }))
    //                      ↑ spread keeps old fields, then overwrite just one
  }

  function handleConsigneeChange(field, value) {
    setConsignee(prev => ({ ...prev, [field]: value }))
  }

  // Update one field inside one package (found by its id)
  function handlePackageChange(id, field, value) {
    setPackages(prev =>
      prev.map(pkg => pkg.id === id ? { ...pkg, [field]: value } : pkg)
    )
    // .map() loops through all packages, updates the matching one, keeps rest unchanged
  }

  function addPackage() {
    setPackages(prev => [...prev, createEmptyPackage()])
    //                    ↑ spread old packages, add new one at end
  }

  function removePackage(id) {
    // Minimum 1 package required
    if (packages.length <= 1) return
    setPackages(prev => prev.filter(pkg => pkg.id !== id))
    // .filter() keeps only packages whose id does NOT match
  }

  // =========================================================
  // RENDER - What gets shown on screen
  // =========================================================
  return (
    <div className={styles.appWrapper}>
      {/* Top Header Bar */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>📦</span>
            <span className={styles.logoText}>SwiftShip</span>
            <span className={styles.logoBadge}>Logistics</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerTag}>Order Management Portal</span>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <main className={styles.main}>
        {/* LEFT COLUMN - Form */}
        <section className={styles.leftPanel}>
          <OrderForm
            orderId={orderId}
            shipmentDate={shipmentDate}
            deliveryType={deliveryType}
            consignor={consignor}
            consignee={consignee}
            packages={packages}
            fragile={fragile}
            insured={insured}
            onShipmentDateChange={setShipmentDate}
            onDeliveryTypeChange={setDeliveryType}
            onConsignorChange={handleConsignorChange}
            onConsigneeChange={handleConsigneeChange}
            onPackageChange={handlePackageChange}
            onAddPackage={addPackage}
            onRemovePackage={removePackage}
            onFragileChange={setFragile}
            onInsuredChange={setInsured}
          />
        </section>

        {/* RIGHT COLUMN - Live Preview */}
        <section className={styles.rightPanel}>
          <ShipmentPreview
            orderId={orderId}
            shipmentDate={shipmentDate}
            deliveryType={deliveryType}
            consignor={consignor}
            consignee={consignee}
            packages={packages}
            fragile={fragile}
            insured={insured}
          />
        </section>
      </main>
    </div>
  )
}
