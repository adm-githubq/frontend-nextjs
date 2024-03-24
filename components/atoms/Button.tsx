'use client'

type ButtonProps = {
  color:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'black'
    | 'transparent'
    | 'white'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  size?: 'small' | 'normal' | 'large'
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  onClick,
  type,
  size
}) => {
  const colorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-gradient-primary'
      case 'secondary':
        return 'bg-green-500 hover:bg-green-700'
      case 'tertiary':
        return 'bg-blue-500 hover:bg-blue-700'
      case 'black':
        return 'bg-black hover:bg-gray-900'
      case 'transparent':
        return 'bg-transparent hover:bg-gray-300 border border-white '
      case 'white':
        return 'bg-white hover:bg-gray-200 border border-black '
    }
  }

  return (
    <button
      className={`${
        color === 'white' ? 'text-black' : 'text-white'
      } font-semibold font-sans text-base rounded-full ${
        size === 'large' ? 'py-4 px-8' : size === 'small' ? 'py-2 px-4' : 'py-2 px-6'
      } ${colorClasses()} hover:scale-105 transition-all duration-300`}
      onClick={onClick}
      type={type ?? 'button'}
    >
      {children}
    </button>
  )
}

export default Button
