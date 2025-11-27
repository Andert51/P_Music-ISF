import { Home, Music, Heart, Library, Upload } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Inicio', path: '/', active: true },
    { icon: Music, label: 'Álbumes', path: '/albums', active: false },
    { icon: Heart, label: 'Favoritas', path: '/liked', active: false },
    { icon: Library, label: 'Biblioteca', path: '/library', active: false },
    { icon: Upload, label: 'Subir', path: '/upload', active: false },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-gruvbox-bg via-gruvbox-bg1 to-gruvbox-bg2 border-r border-gruvbox-aqua/20 p-6 flex flex-col min-h-screen shadow-xl">
      <div className="mb-10 px-3">
        <div className="flex items-center gap-3">
          <Music className="w-9 h-9 text-gruvbox-aqua" />
          <div>
            <h1 className="text-2xl font-bold text-gruvbox-fg">P-Music TD</h1>
            <p className="text-xs text-gruvbox-fg4">Sprint 1 MVP</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          const isDisabled = !item.active
          return (
            <Link
              key={item.path}
              to={isDisabled ? '#' : item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${isActive 
                  ? 'bg-gruvbox-aqua text-gruvbox-bg font-bold shadow-md' 
                  : isDisabled
                  ? 'text-gruvbox-fg4 opacity-40 cursor-not-allowed'
                  : 'text-gruvbox-fg hover:bg-gruvbox-bg2 hover:text-gruvbox-aqua'
                }
              `}
              onClick={e => isDisabled && e.preventDefault()}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isDisabled && (
                <span className="ml-auto text-xs">(Sprint 2+)</span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="mt-8 px-3 py-4 border-t border-gruvbox-aqua/20">
        <p className="text-xs text-gruvbox-fg4">
          MVP Sprint 1<br />
          Solo autenticación funcional
        </p>
      </div>
    </aside>
  )
}
