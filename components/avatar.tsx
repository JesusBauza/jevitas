import { Image } from 'caravaggio-react'
import styles from './avatar.module.css'

export type AvatarProps = {
  user?: {
    name?: string
    image?: string
  }
  scale?: string
  width?: string | number
  height?: string | number
  loading?: boolean
}

const Avatar = ({ user, width = 42, height = 42, scale = '128x128', loading }: AvatarProps) =>
  loading || !user ? (
    <div
      className="skeleton" style={{
        width,
        height,
        borderRadius: '50%',
      }}
    />
  ) : (
    user?.image ? (
      <span
        className={styles.avatarWrapper}
        style={{
          width,
          height,
        }}
      >
        <Image
          src={user.image}
          className={styles.avatar}
          alt={user.name}
          loading="lazy"
          opt={{
            progressive: true,
            q: 90,
            rs: {
              s: scale
            },
          }}
        />
      </span>
    ) : (
      <div
        className="bg-gradient-to-br border from-green-400 to-purple-300 border-x-gray-600"
        style={{
          borderRadius: '100%',
          width,
          height
        }}
      />
    )
  )


export default Avatar
