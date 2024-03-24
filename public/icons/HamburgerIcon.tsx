
interface HamburgerIconProps {
  className?: string
  stroke?: string
  }

export const HamburgerIcon:React.FC<HamburgerIconProps> = (props) => {
return (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_751_622)'>
      <path
        d='M6.66699 10H33.3337'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66699 20H33.3337'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66699 30H33.3337'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_751_622'>
        <rect width='40' height='40' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
}

