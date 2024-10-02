export default function SvgPathAnimation() {
  return (
    <div
      className="mt-10 hidden items-center justify-center bg-white p-4 md:flex"
      style={{
        mask: 'linear-gradient(90deg, transparent, white 40%, white 60%, transparent)',
      }}
    >
      <svg
        width="488"
        height="260"
        viewBox="0 0 488 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 214.853H35H64H88.5C102 176.5 164.083 129.466 206.076 214.853C248.069 300.24 344 239.5 366.5 218C383 205.147 437.774 170.244 416 151.5C388.782 128.071 256.623 85.9918 192.467 75.5787C141.143 67.2483 111 87.5 108 105C112.536 119.535 144.253 145.997 192.467 130.898C240.681 115.799 261.159 65.1657 265.371 41.7363C263.427 27.2014 276.523 1.38567 337.303 1.38567C385.906 1.38566 461.727 0.517915 487 1.38567"
          stroke="black"
        />
      </svg>
    </div>
  )
}
