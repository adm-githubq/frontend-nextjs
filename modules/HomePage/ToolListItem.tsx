interface ToolListItemProps {
  title: string
  isOdd?: boolean
}
export const ToolListItem = ({ title, isOdd }: ToolListItemProps) => {
  return (
    <div
      className={`flex flex-shrink items-center justify-center h-44 w-44  bg-[url('/ToolsItemBG.svg')] bg-contain bg-no-repeat bg-center p-2 ${
        isOdd
          ? 'ml-auto -mt-20 lg:mt-24 lg:ml-0'
          : 'mr-auto -mt-16 lg:-mt-24 lg:mr-0'
      }`}
    >
      <span className='text-white font-bold text-center text-xl'>{title}</span>
    </div>
  )
}
