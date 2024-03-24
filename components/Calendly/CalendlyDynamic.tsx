import { CalendlyButtonProps } from '../Calendly/CalendlyChild'
import { Calendly } from '../Calendly/CalendlyChild'

export const CalendlyWrapper: React.FC<CalendlyButtonProps> = ({
  buttonContents
}) => {
  return (
    <div>
      <Calendly buttonContents={buttonContents} />
    </div>
  )
}

export default CalendlyWrapper
