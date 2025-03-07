interface IPhoneFrameProps { className: string, height: number, width: number }

function IPhoneFrame({ className, height, width }: IPhoneFrameProps) {
  return (
    <svg className={className} viewBox="0 0 450 920" height={height} width={width}>
      <path d="M466.4-24c-26.5-1.2-77-2.5-103.4-2.5L431.6 54l-1.4 813-67 58.3 113.2 7.6z" style={{ fill: "var(--bg-color-projects)" }} />
      <path d="M-32-26.8c38.9 1 74.4 0 113.3 0L18.5 54.8l1.3 806.8 70.6 71.6H-31.1Z" style={{ fill: "var(--bg-color-projects)" }} />
      <path fill="url(#a)" d="M0 0h450v920H0z" />
      <defs>
        <pattern id="a" width="1" height="1" patternContentUnits="objectBoundingBox">
          <use xlinkHref="#b" transform="scale(.00074 .00036)" />
        </pattern>
        <image xlinkHref="/imgs/iphone.png" id="b" width="1350" height="2760" preserveAspectRatio="none" />
      </defs>
    </svg>
  )
}

export default IPhoneFrame