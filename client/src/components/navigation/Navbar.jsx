import logo from '../../assets/img/logo.webp';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { getImageUrl } from '../../utils/getImage';
import { CartIcon } from '../cart/CartIcon';

const baseNavigation = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Menú', href: '/menu', current: false },
  { name: 'Promociones', href: '/promociones', current: false },
  { name: 'Ubicaciones', href: '/ubicaciones', current: false },
]

const privateNavigation = [
  { name: 'Domicilio', href: '/domicilio', current: false },
  { name: 'Reservación', href: '/reservaciones', current: false },
  { name: 'Publicaciones', href: '/publicaciones', current: false },
  { name: 'Crear Comentario', href: '/publicaciones/crear', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUserDetails(JSON.parse(userData))
      }
    } catch (error) {
      console.error('Error parsing user details:', error)
      setUserDetails({})
    }
  }, [])

  const navigation = userDetails.username || userDetails.name
    ? [...baseNavigation, ...privateNavigation]
    : baseNavigation;

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  const userProfileImage = userDetails.profilePicture
    ? getImageUrl(userDetails.profilePicture)
    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  return (
    <Disclosure as="nav" className="backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-purple-900 hover:bg-purple-700/30 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-purple-300">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block w-6 h-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden w-6 h-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="BELLA AMORE"
                src={logo}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-purple-700/50 text-white'
                      : 'text-purple-100 hover:bg-purple-700/30 hover:text-white',
                    'rounded-md px-3 py-2 text-[13px] font-medium transition-colors'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <CartIcon />
            {userDetails.username || userDetails.name ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex items-center space-x-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 px-3 py-1 hover:bg-purple-700/20 transition-colors">
                  <span className="hidden sm:block text-purple-100 text-[18px] font-medium">
                    {userDetails.username || userDetails.name}
                  </span>
                  <img
                    alt="Profile"
                    src={userProfileImage}
                    className="w-8 h-8 rounded-full bg-purple-700 ring-2 ring-purple-200"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-[13px] text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Mi Perfil
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-[13px] text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Configuración
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Cerrar sesión
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link 
                to="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 ml-4 transition-colors"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            item.href !== '#' ? (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current ? 'bg-purple-700/50 text-white' : 'text-purple-100 hover:bg-purple-700/30 hover:text-white',
                  'block rounded-md px-3 py-2 text-[13px] font-medium text-center',
                )}
              >
                {item.name}
              </Link>
            ) : (
              <DisclosureButton
                key={item.name}
                as="button"
                className={classNames(
                  item.current ? 'bg-purple-700/50 text-white' : 'text-purple-100 hover:bg-purple-700/30 hover:text-white',
                  'block rounded-md px-3 py-2 text-[13px] font-medium text-center',
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
