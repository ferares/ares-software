import Image from "next/image"

interface BadgeProps { icon: string, title: string, size: number, small?: boolean }

function Badge({ icon, size, title, small }: BadgeProps) {
  return (
    <div className={`badge ${small ? "badge--small" : ""}`}>
      <Image className="badge__icon" src={icon} alt="" height={size} width={size} />
      <span className="badge__label">{title}</span>
    </div>
  )
}

export default Badge