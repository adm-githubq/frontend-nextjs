import Script from 'next/script'
import Button from '../atoms/Button'

interface CalendlyButtonProps {
  buttonContents?: string | undefined
}

const CalendlyScript: React.FC<CalendlyButtonProps> = ({ buttonContents }) => {
  return (
    <>
      <Script
        type='text/javascript'
        src='https://assets.calendly.com/assets/external/widget.js'
        async
      />
      <Script
        src='https://assets.calendly.com/assets/external/widget.css>'
        type='stylesheet'
        async
      />
      <Button
        color='black'
        type='button'
        size='large'
        onClick={() =>
          // @ts-ignore
          Calendly.initPopupWidget({
            url: 'https://calendly.com/d/42s-sws-3qw/quantum-adr-founder-introductions',
            text: 'Schedule time with us',
            color: '#0069FF',
            textColor: '#FFFFFF',
            branding: undefined
          })
        }
      >
        {buttonContents || 'Get in Touch'}
      </Button>
    </>
  )
}

export default CalendlyScript

// <!-- Calendly badge widget begin -->
// <link href=“https://assets.calendly.com/assets/external/widget.css” rel=“stylesheet”>
// <script src=“https://assets.calendly.com/assets/external/widget.js” type=“text/javascript” async></script>
// <script type=“text/javascript”>window.onload = function() { Calendly.initBadgeWidget({ url: ‘https://calendly.com/d/42s-sws-3qw/quantum-adr-founder-introductions’, text: ‘Schedule time with us’, color: ‘#0069FF’, textColor: ‘#FFFFFF’, branding: undefined }); }</script>
// <!-- Calendly badge widget end -->
