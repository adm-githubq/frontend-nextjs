import { cn } from "@/core/utils";
import { ReactElement } from "react";

type Props = {
  data:
    | {
        content: string
      }[]
    | undefined
    | null;
} & Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

export default function TagLines(props: Props) {
  if (props.data === undefined || props.data === null) return null
  if (props.data.length === 0) return null

  return (
    <div className={cn('flex flex-col xl:flex-row items-start w-full gap-x-12 gap-y-2 text-xl text-white font-bold flex-wrap', props.className)}>
      {props.data.map(item => (
        <h3 className='text-nowrap'>{item.content}</h3>
      ))}
    </div>
  )
}
