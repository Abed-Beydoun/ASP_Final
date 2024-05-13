import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NavLink, useHref } from 'react-router-dom';

const Navbar = () => {
  const href = useHref();

  return (
    <Disclosure as="nav" className="bg-white shadow z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex justify-between w-full">
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                  <NavLink to="/">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
                      alt="Your Company"
                    />
                  </NavLink>
                  <NavLink
                    exact
                    to="/about-us"
                    className={classNames(
                      href === '/about-us' ? ' border-b-2' : '',
                      'inline-flex items-center border-green-500 px-1 pt-1 text-sm font-medium text-gray-900'
                    )}
                  >
                    About us
                  </NavLink>
                  <NavLink
                    exact
                    to="/contact-us"
                    className={classNames(
                      href === '/contact-us' ? ' border-b-2' : '',
                      'inline-flex items-center border-green-500 px-1 pt-1 text-sm font-medium text-gray-900'
                    )}
                  >
                    Contact us
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    exact
                    to="/register"
                    className={classNames(
                      href === '/register' ? ' border-b-2' : '',
                      'inline-flex items-center border-green-500 px-1 pt-1 text-sm font-medium text-gray-900'
                    )}
                  >
                    Register
                  </NavLink>

                  <NavLink
                    exact
                    to="/login"
                    className={classNames(
                      href === '/login' ? ' border-b-2' : '',
                      'inline-flex items-center border-green-500 px-1 pt-1 text-sm font-medium text-gray-900'
                    )}
                  >
                    Login
                  </NavLink>
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/login"
                className="block border-l-4 border-green-500 bg-green-50 py-2 pl-3 pr-4 text-base font-medium text-green-700"
              >
                Login
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
