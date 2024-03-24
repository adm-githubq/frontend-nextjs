
interface ArrowIconProps {
    className?: string
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({className = 'stroke-white'}) => {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
<g id="Icon24/Arrow-right">
<path id="Vector" d="M5 12H19M19 12L13 18M19 12L13 6"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</g>
</svg>
    
    }