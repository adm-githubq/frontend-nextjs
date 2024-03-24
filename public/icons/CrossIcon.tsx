
interface CrossIconProps {
  className?: string
  stroke?: string
  }

export const CrossIcon:React.FC<CrossIconProps> = (props) => {
return (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_751_1927)'>
      <path
        d='M30 10L10 30'
        stroke={props.stroke || '#212427'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 10L30 30'
        stroke={props.stroke || '#212427'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_751_1927'>
        <rect width='40' height='40' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
}

