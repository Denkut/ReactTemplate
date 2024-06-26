import PropTypes from "prop-types";
import {
  ArrowLeftEndOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ROLE } from "../../../constants";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserLogin,
  selectUserRole,
} from "../../../selectors";

export const HeaderMobile = ({
  updatedNavigation,
  onLogout,
  cartItemCount,
}) => {
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const user = useSelector(selectUser);

  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-gray-500/10">
        <div className="space-y-2 py-6">
          {updatedNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="py-6">
          {roleId === ROLE.ADMIN && (
            <>
              <Link
                to="/meal"
                className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Добавить блюдо
              </Link>
              <Link
                to="/ration"
                className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Добавить рацион
              </Link>
            </>
          )}
          {roleId !== ROLE.GUEST ? (
            <div>
              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="block h-10 w-auto rounded-lg py-1 text-base font-semibold leading-7 text-gray-900 hover:text-emerald-800" />
                {cartItemCount > 0 && (
                  <span className="absolute left-2 top-1 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          ) : null}
          {roleId === ROLE.GUEST ? (
            <Link
              to="/login"
              className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Войти
            </Link>
          ) : (
            <>
              <Link
                to={`profile/${user.id}`}
                className="-mx-3 block rounded-lg px-3 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {login}
              </Link>
              <ArrowLeftEndOnRectangleIcon
                onClick={onLogout}
                className=" block h-6 w-auto cursor-pointer rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

HeaderMobile.propTypes = {
  updatedNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLogout: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number.isRequired,
};
