import type { ObjectType } from "./types";

interface SpriteProps {
  className?: string;
  width?: number;
  height?: number;
}

function Desk({ className, width = 120, height = 80 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Table top */}
      <polygon
        points="20,25 60,10 100,25 60,40"
        fill="#8B6914"
        stroke="#5C4400"
        strokeWidth="1"
      />
      {/* Front face */}
      <polygon
        points="20,25 20,35 60,50 60,40"
        fill="#6B4E0A"
        stroke="#5C4400"
        strokeWidth="1"
      />
      {/* Right face */}
      <polygon
        points="60,40 60,50 100,35 100,25"
        fill="#7A5A0E"
        stroke="#5C4400"
        strokeWidth="1"
      />
      {/* Left leg front */}
      <line x1="22" y1="35" x2="22" y2="70" stroke="#5C4400" strokeWidth="3" />
      {/* Right leg front */}
      <line x1="58" y1="50" x2="58" y2="75" stroke="#5C4400" strokeWidth="3" />
      {/* Right leg back */}
      <line x1="98" y1="35" x2="98" y2="70" stroke="#5C4400" strokeWidth="3" />
      {/* Left leg back */}
      <line x1="62" y1="50" x2="62" y2="75" stroke="#5C4400" strokeWidth="3" />
    </svg>
  );
}

function Chair({ className, width = 50, height = 70 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 50 70"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Seat */}
      <polygon
        points="10,35 25,28 40,35 25,42"
        fill="#A0522D"
        stroke="#6B3410"
        strokeWidth="1"
      />
      {/* Back rest */}
      <polygon
        points="10,35 10,15 25,8 25,28"
        fill="#8B4513"
        stroke="#6B3410"
        strokeWidth="1"
      />
      {/* Back rest right side */}
      <polygon
        points="25,8 28,9 28,30 25,28"
        fill="#6B3410"
        stroke="#5C2D0E"
        strokeWidth="0.5"
      />
      {/* Front left leg */}
      <line x1="11" y1="42" x2="11" y2="62" stroke="#6B3410" strokeWidth="2" />
      {/* Front right leg */}
      <line x1="39" y1="42" x2="39" y2="62" stroke="#6B3410" strokeWidth="2" />
      {/* Back left leg */}
      <line x1="25" y1="42" x2="25" y2="65" stroke="#6B3410" strokeWidth="2" />
    </svg>
  );
}

function Bookshelf({ className, width = 80, height = 120 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 80 120"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Left side */}
      <polygon
        points="5,10 5,110 20,115 20,15"
        fill="#4A2C0A"
        stroke="#3A2008"
        strokeWidth="1"
      />
      {/* Front face */}
      <polygon
        points="20,15 20,115 70,110 70,10"
        fill="#654321"
        stroke="#3A2008"
        strokeWidth="1"
      />
      {/* Top */}
      <polygon
        points="5,10 20,15 70,10 55,5"
        fill="#7A5230"
        stroke="#3A2008"
        strokeWidth="1"
      />
      {/* Shelves */}
      <line
        x1="20"
        y1="40"
        x2="70"
        y2="37"
        stroke="#3A2008"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="65"
        x2="70"
        y2="62"
        stroke="#3A2008"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="90"
        x2="70"
        y2="87"
        stroke="#3A2008"
        strokeWidth="1.5"
      />
      {/* Books top shelf */}
      <rect x="24" y="20" width="6" height="18" fill="#C0392B" />
      <rect x="32" y="22" width="5" height="16" fill="#2980B9" />
      <rect x="39" y="19" width="6" height="19" fill="#27AE60" />
      <rect x="47" y="21" width="5" height="17" fill="#8E44AD" />
      <rect x="54" y="20" width="7" height="18" fill="#D4AC0D" />
      {/* Books middle shelf */}
      <rect x="24" y="44" width="7" height="18" fill="#1ABC9C" />
      <rect x="33" y="46" width="5" height="16" fill="#E74C3C" />
      <rect x="40" y="43" width="6" height="19" fill="#3498DB" />
      <rect x="48" y="45" width="8" height="17" fill="#F39C12" />
      {/* Books bottom shelf */}
      <rect x="24" y="69" width="8" height="18" fill="#9B59B6" />
      <rect x="34" y="71" width="6" height="16" fill="#1ABC9C" />
      <rect x="42" y="68" width="7" height="19" fill="#E67E22" />
    </svg>
  );
}

function Door({ className, width = 60, height = 120 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 60 120"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Door frame */}
      <rect
        x="5"
        y="5"
        width="50"
        height="110"
        fill="#2C1810"
        stroke="#1A0E0A"
        strokeWidth="2"
      />
      {/* Door panel */}
      <rect
        x="10"
        y="8"
        width="40"
        height="104"
        fill="#5C4033"
        stroke="#3A2820"
        strokeWidth="1"
      />
      {/* Upper panel inset */}
      <rect
        x="15"
        y="15"
        width="30"
        height="35"
        fill="#4A3328"
        stroke="#3A2820"
        strokeWidth="0.5"
      />
      {/* Lower panel inset */}
      <rect
        x="15"
        y="60"
        width="30"
        height="45"
        fill="#4A3328"
        stroke="#3A2820"
        strokeWidth="0.5"
      />
      {/* Door handle */}
      <circle
        cx="42"
        cy="62"
        r="3"
        fill="#DAA520"
        stroke="#B8860B"
        strokeWidth="1"
      />
    </svg>
  );
}

function Key({ className, width = 40, height = 20 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 40 20"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Key head */}
      <circle
        cx="10"
        cy="10"
        r="6"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="10"
        r="2.5"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1"
      />
      {/* Key shaft */}
      <rect
        x="15"
        y="8.5"
        width="20"
        height="3"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
      {/* Key teeth */}
      <rect
        x="30"
        y="11"
        width="2"
        height="4"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
      <rect
        x="34"
        y="11"
        width="2"
        height="3"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Safe({ className, width = 60, height = 60 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Top face */}
      <polygon
        points="10,15 30,8 50,15 30,22"
        fill="#3D5A5A"
        stroke="#2A3F3F"
        strokeWidth="1"
      />
      {/* Front face */}
      <polygon
        points="10,15 10,50 30,57 30,22"
        fill="#2F4F4F"
        stroke="#1A3030"
        strokeWidth="1"
      />
      {/* Right face */}
      <polygon
        points="30,22 30,57 50,50 50,15"
        fill="#3A5A5A"
        stroke="#1A3030"
        strokeWidth="1"
      />
      {/* Dial */}
      <circle
        cx="20"
        cy="38"
        r="5"
        fill="#1A3030"
        stroke="#DAA520"
        strokeWidth="1"
      />
      <circle cx="20" cy="38" r="2" fill="#DAA520" />
      {/* Handle */}
      <rect
        x="14"
        y="28"
        width="12"
        height="2"
        rx="1"
        fill="#C0C0C0"
        stroke="#808080"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Note({ className, width = 35, height = 40 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 35 40"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Paper */}
      <rect
        x="3"
        y="3"
        width="28"
        height="34"
        fill="#FFFACD"
        stroke="#D4C68A"
        strokeWidth="1"
      />
      {/* Folded corner */}
      <polygon points="24,3 31,3 31,10" fill="#D4C68A" />
      <polygon
        points="24,3 31,10 24,10"
        fill="#EDE8B0"
        stroke="#D4C68A"
        strokeWidth="0.5"
      />
      {/* Text lines */}
      <line
        x1="7"
        y1="12"
        x2="24"
        y2="12"
        stroke="#8B7355"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="7"
        y1="17"
        x2="22"
        y2="17"
        stroke="#8B7355"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="7"
        y1="22"
        x2="20"
        y2="22"
        stroke="#8B7355"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="7"
        y1="27"
        x2="18"
        y2="27"
        stroke="#8B7355"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

function Painting({ className, width = 80, height = 60 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Frame */}
      <rect
        x="3"
        y="3"
        width="74"
        height="54"
        fill="#8B6914"
        stroke="#5C4400"
        strokeWidth="3"
      />
      {/* Canvas */}
      <rect x="8" y="8" width="64" height="44" fill="#1a1a2e" />
      {/* Abstract art - landscape */}
      <rect x="8" y="35" width="64" height="17" fill="#2d5a27" />
      <circle cx="55" cy="20" r="8" fill="#F4D03F" opacity="0.8" />
      <polygon points="20,52 30,30 40,52" fill="#1a472a" />
      <polygon points="35,52 48,25 61,52" fill="#145214" />
    </svg>
  );
}

function Box({ className, width = 45, height = 40 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 45 40"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Top face */}
      <polygon
        points="8,12 22,6 37,12 22,18"
        fill="#DEB887"
        stroke="#A0845C"
        strokeWidth="1"
      />
      {/* Front face */}
      <polygon
        points="8,12 8,32 22,38 22,18"
        fill="#CD853F"
        stroke="#8B6914"
        strokeWidth="1"
      />
      {/* Right face */}
      <polygon
        points="22,18 22,38 37,32 37,12"
        fill="#D4954A"
        stroke="#8B6914"
        strokeWidth="1"
      />
      {/* Tape on top */}
      <line x1="15" y1="9" x2="30" y2="9" stroke="#C4A45C" strokeWidth="2" />
    </svg>
  );
}

function Plant({ className, width = 40, height = 65 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 40 65"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Pot */}
      <polygon
        points="12,45 10,62 30,62 28,45"
        fill="#C0392B"
        stroke="#922B21"
        strokeWidth="1"
      />
      <polygon
        points="10,43 12,45 28,45 30,43"
        fill="#E74C3C"
        stroke="#922B21"
        strokeWidth="0.5"
      />
      {/* Soil */}
      <ellipse cx="20" cy="44" rx="9" ry="3" fill="#3E2723" />
      {/* Leaves */}
      <ellipse
        cx="15"
        cy="28"
        rx="6"
        ry="12"
        fill="#27AE60"
        stroke="#1E8449"
        strokeWidth="0.5"
        transform="rotate(-20 15 28)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="5"
        ry="11"
        fill="#2ECC71"
        stroke="#1E8449"
        strokeWidth="0.5"
        transform="rotate(15 25 25)"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="5"
        ry="13"
        fill="#229954"
        stroke="#1E8449"
        strokeWidth="0.5"
        transform="rotate(5 20 20)"
      />
      {/* Stem */}
      <line
        x1="20"
        y1="44"
        x2="20"
        y2="30"
        stroke="#1E8449"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Padlock({ className, width = 30, height = 40 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 30 40"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Shackle */}
      <path
        d="M9,16 A6,6 0 0 1 21,16"
        fill="none"
        stroke="#808080"
        strokeWidth="3"
      />
      {/* Body */}
      <rect
        x="5"
        y="16"
        width="20"
        height="18"
        rx="2"
        fill="#696969"
        stroke="#4A4A4A"
        strokeWidth="1"
      />
      {/* Keyhole */}
      <circle cx="15" cy="24" r="2.5" fill="#333" />
      <rect x="14" y="25" width="2" height="5" fill="#333" />
    </svg>
  );
}

function CombinationLock({ className, width = 35, height = 45 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 35 45"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Shackle */}
      <path
        d="M10,15 A7,7 0 0 1 25,15"
        fill="none"
        stroke="#707070"
        strokeWidth="3"
      />
      {/* Body */}
      <rect
        x="4"
        y="15"
        width="27"
        height="25"
        rx="2"
        fill="#555"
        stroke="#3A3A3A"
        strokeWidth="1"
      />
      {/* Dial */}
      <circle
        cx="17.5"
        cy="28"
        r="7"
        fill="#333"
        stroke="#666"
        strokeWidth="1"
      />
      <circle cx="17.5" cy="28" r="1.5" fill="#999" />
      {/* Dial marks */}
      <line
        x1="17.5"
        y1="22"
        x2="17.5"
        y2="23.5"
        stroke="#999"
        strokeWidth="0.5"
      />
      <line
        x1="17.5"
        y1="32.5"
        x2="17.5"
        y2="34"
        stroke="#999"
        strokeWidth="0.5"
      />
      <line x1="12" y1="28" x2="13.5" y2="28" stroke="#999" strokeWidth="0.5" />
      <line x1="21.5" y1="28" x2="23" y2="28" stroke="#999" strokeWidth="0.5" />
    </svg>
  );
}

function Rug({ className, width = 100, height = 50 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 100 50"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Rug shape (isometric diamond) */}
      <polygon
        points="50,5 95,25 50,45 5,25"
        fill="#800020"
        stroke="#5C0018"
        strokeWidth="1"
      />
      {/* Inner pattern */}
      <polygon
        points="50,12 80,25 50,38 20,25"
        fill="#9B0028"
        stroke="#5C0018"
        strokeWidth="0.5"
      />
      {/* Center diamond */}
      <polygon
        points="50,18 65,25 50,32 35,25"
        fill="#B0003A"
        stroke="#800020"
        strokeWidth="0.5"
      />
      {/* Fringe indicators */}
      <line x1="10" y1="25" x2="7" y2="26" stroke="#5C0018" strokeWidth="0.5" />
      <line
        x1="90"
        y1="25"
        x2="93"
        y2="26"
        stroke="#5C0018"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Mirror({ className, width = 40, height = 65 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 40 65"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Frame */}
      <ellipse
        cx="20"
        cy="30"
        rx="16"
        ry="24"
        fill="#8B6914"
        stroke="#5C4400"
        strokeWidth="2"
      />
      {/* Glass */}
      <ellipse cx="20" cy="30" rx="13" ry="21" fill="#B0C4DE" opacity="0.6" />
      {/* Shine */}
      <ellipse
        cx="14"
        cy="22"
        rx="4"
        ry="8"
        fill="white"
        opacity="0.2"
        transform="rotate(-15 14 22)"
      />
    </svg>
  );
}

function Clock({ className, width = 40, height = 40 }: SpriteProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      {/* Frame */}
      <circle
        cx="20"
        cy="20"
        r="17"
        fill="#2C2C2C"
        stroke="#DAA520"
        strokeWidth="2"
      />
      {/* Face */}
      <circle cx="20" cy="20" r="14" fill="#F5F5DC" />
      {/* Hour marks */}
      <line x1="20" y1="8" x2="20" y2="10" stroke="#333" strokeWidth="1.5" />
      <line x1="20" y1="30" x2="20" y2="32" stroke="#333" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="10" y2="20" stroke="#333" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="32" y2="20" stroke="#333" strokeWidth="1.5" />
      {/* Hands */}
      <line x1="20" y1="20" x2="20" y2="11" stroke="#333" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="26" y2="16" stroke="#333" strokeWidth="1" />
      {/* Center */}
      <circle cx="20" cy="20" r="1.5" fill="#333" />
    </svg>
  );
}

const SPRITE_MAP: Partial<Record<ObjectType, React.FC<SpriteProps>>> = {
  desk: Desk,
  chair: Chair,
  bookshelf: Bookshelf,
  door: Door,
  key: Key,
  safe: Safe,
  note: Note,
  painting: Painting,
  box: Box,
  plant: Plant,
  padlock: Padlock,
  "combination-lock": CombinationLock,
  rug: Rug,
  mirror: Mirror,
  clock: Clock,
};

interface ObjectSpriteProps extends SpriteProps {
  type: ObjectType;
}

export function ObjectSprite({ type, ...props }: ObjectSpriteProps) {
  const Component = SPRITE_MAP[type];
  if (Component) {
    return <Component {...props} />;
  }
  return null;
}

export function hasSprite(type: ObjectType): boolean {
  return type in SPRITE_MAP;
}
