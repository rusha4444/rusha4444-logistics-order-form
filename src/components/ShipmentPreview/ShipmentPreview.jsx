// ShipmentPreview.jsx - The RIGHT PANEL - Live Preview
// This component only RECEIVES data (props) and displays it
// It has NO state of its own - it's a "pure display" component
// Every time props change (user types something), React re-renders this

import styles from './ShipmentPreview.module.css'

// Helper: Format date from "2024-01-15" to "15 Jan 2024"
function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00') // avoid timezone issues
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Helper: Calculate totals from packages array
function calcTotals(packages) {
  const totalWeight = packages.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0)
  const totalValue = packages.reduce((sum, p) => sum + (parseFloat(p.declaredValue) || 0), 0)
  // .reduce() is like a running total - starts at 0, adds each item one by one
  return { totalWeight, totalValue }
}

export default function ShipmentPreview({
  orderId, shipmentDate, deliveryType,
  consignor, consignee, packages,
  fragile, insured,
}) {
  const { totalWeight, totalValue } = calcTotals(packages)

  return (
    <div className={styles.previewWrapper}>
      {/* Preview Header */}
      <div className={styles.previewHeader}>
        <div className={styles.previewTitleRow}>
          <h2 className={styles.previewTitle}>Shipment Preview</h2>
          <span className={styles.liveBadge}>● LIVE</span>
        </div>
        <p className={styles.previewSubtitle}>Updates in real-time as you fill the form</p>
      </div>

      {/* ---- Waybill Card ---- */}
      <div className={styles.waybill}>

        {/* Top Bar: Order ID + Delivery Badge */}
        <div className={styles.waybillTop}>
          <div className={styles.orderIdBlock}>
            <span className={styles.orderIdLabel}>AWB / Order ID</span>
            <span className={styles.orderIdValue}>{orderId}</span>
          </div>
          <span className={`${styles.deliveryBadge} ${deliveryType === 'express' ? styles.express : styles.standard}`}>
            {deliveryType === 'express' ? '⚡ Express' : '🚚 Standard'}
          </span>
        </div>

        {/* Date + Indicators Row */}
        <div className={styles.dateRow}>
          <div className={styles.dateBlock}>
            <span className={styles.metaLabel}>Shipment Date</span>
            <span className={styles.metaValue}>{formatDate(shipmentDate)}</span>
          </div>
          <div className={styles.indicators}>
            {fragile && (
              <span className={styles.indicator} title="Fragile">
                🫙 Fragile
              </span>
            )}
            {insured && (
              <span className={`${styles.indicator} ${styles.indicatorBlue}`} title="Insured">
                🛡️ Insured
              </span>
            )}
          </div>
        </div>

        {/* Divider with arrow */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerArrow}>✈</span>
          <span className={styles.dividerLine} />
        </div>

        {/* From / To addresses */}
        <div className={styles.addressGrid}>
          <div className={styles.addressBlock}>
            <div className={styles.addressType}>
              <span className={styles.dot} style={{ background: '#4f46e5' }}></span>
              FROM
            </div>
            <div className={styles.addressName}>{consignor.name || <Placeholder text="Sender Name" />}</div>
            {consignor.address && <div className={styles.addressLine}>{consignor.address}</div>}
            <div className={styles.addressCityPin}>
              {[consignor.city, consignor.pincode].filter(Boolean).join(' – ') || <Placeholder text="City, Pincode" />}
            </div>
          </div>

          <div className={styles.addressBlock}>
            <div className={styles.addressType}>
              <span className={styles.dot} style={{ background: '#10b981' }}></span>
              TO
            </div>
            <div className={styles.addressName}>{consignee.name || <Placeholder text="Receiver Name" />}</div>
            {consignee.address && <div className={styles.addressLine}>{consignee.address}</div>}
            <div className={styles.addressCityPin}>
              {[consignee.city, consignee.pincode].filter(Boolean).join(' – ') || <Placeholder text="City, Pincode" />}
            </div>
          </div>
        </div>

        {/* Packages section */}
        <div className={styles.packagesSection}>
          <div className={styles.packagesSectionTitle}>
            📦 Package Details
            <span className={styles.pkgCountBadge}>{packages.length} pkg{packages.length > 1 ? 's' : ''}</span>
          </div>

          <div className={styles.packagesList}>
            {packages.map((pkg, i) => (
              <div key={pkg.id} className={styles.pkgRow}>
                <div className={styles.pkgInfo}>
                  <span className={styles.pkgIndex}>{i + 1}</span>
                  <span className={styles.pkgName}>{pkg.label || `Package ${i + 1}`}</span>
                </div>
                <div className={styles.pkgDetails}>
                  {/* Show dimensions only if all three are filled */}
                  {(pkg.length && pkg.width && pkg.height) && (
                    <span className={styles.pkgDim}>
                      {pkg.length}×{pkg.width}×{pkg.height} cm
                    </span>
                  )}
                  {pkg.weight && (
                    <span className={styles.pkgWeight}>{pkg.weight} kg</span>
                  )}
                  {pkg.declaredValue && (
                    <span className={styles.pkgValue}>₹{Number(pkg.declaredValue).toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>{packages.length}</span>
            <span className={styles.statLabel}>Total Packages</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>{totalWeight.toFixed(2)} kg</span>
            <span className={styles.statLabel}>Total Weight</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>₹{totalValue.toLocaleString('en-IN')}</span>
            <span className={styles.statLabel}>Declared Value</span>
          </div>
        </div>

        {/* Footer barcode-like strip */}
        <div className={styles.waybillFooter}>
          <div className={styles.barcodeStrip}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span key={i} className={styles.barcodeLine} style={{ height: `${Math.random() > 0.5 ? 20 : 12}px` }} />
            ))}
          </div>
          <span className={styles.barcodeText}>{orderId}</span>
        </div>
      </div>
    </div>
  )
}

// Small helper component for placeholder text in preview
function Placeholder({ text }) {
  return <span style={{ color: '#c1cad4', fontStyle: 'italic', fontWeight: 400 }}>{text}</span>
}
