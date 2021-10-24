const Wave = ({ color = 'currentcolor', className = '' }) => (
  <svg width="100%" height="200px" className={className} fill="none">
    <path
      fill={color}
      d="
      M0 67
      C 273,183
        822,-40
        1920.00,106
      V 359
      H 0
      V 67
      Z">
      <animate
        repeatCount="indefinite"
        fill="blue"
        attributeName="d"
        dur="20s"
        values="
        M0 77
        C 473,283
          822,-40
          1920,116
        V 359
        H 0
        V 67
        Z;
        M0 77
        C 473,-40
          1222,283
          1920,136
        V 359
        H 0
        V 67
        Z;
        M0 77
        C 973,260
          1722,-53
          1920,120
        V 359
        H 0
        V 67
        Z;
        M0 77
        C 473,283
          822,-40
          1920,116
        V 359
        H 0
        V 67
        Z
        ">
      </animate>
    </path>
  </svg>
)

export default Wave
