
interface LetterIconProps {
  className?: string
  stroke?: string
  }

export const LetterIcon:React.FC<LetterIconProps> = (props) => {
return (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={props.className}
    {...props}
  >
    <path
      d='M11.666 15.0002L19.9994 20.8335L28.3327 15.0002'
      stroke={props.stroke || 'white'}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.33398 29.6668V10.3335C3.33398 9.22893 4.22942 8.3335 5.33398 8.3335H34.6673C35.7719 8.3335 36.6673 9.22893 36.6673 10.3335V29.6668C36.6673 30.7714 35.7719 31.6668 34.6673 31.6668H5.33398C4.22941 31.6668 3.33398 30.7714 3.33398 29.6668Z'
      stroke={props.stroke || 'white'}
      strokeWidth='1.5'
    />
  </svg>
)
}

