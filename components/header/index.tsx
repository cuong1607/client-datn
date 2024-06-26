import { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "components/context/theme-context";
import LocalStorage from "utils/LocalStorage";
type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }
    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 style={{ height: "15px" }} className="site-logo">
            <Logo />
            MẮT KÍNH CỘNG ĐỒNG
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link
            className="hvr-underline-from-left"
            href="/"
            style={{ height: "25px" }}
          >
            Trang chủ
          </Link>
          <Link
            style={{ height: "25px" }}
            href="/products"
            className="hvr-underline-from-left"
          >
            Sản phẩm
          </Link>
          <a
            style={{ height: "25px" }}
            className="hvr-underline-from-left"
            href="/contact"
          >
            Liên hệ
          </a>

          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          {/* <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Nhập tên sản phẩm"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button> */}
          <DarkModeSwitch
            className="dark-toggle"
            checked={theme === "light" ? false : true}
            onChange={toggleTheme}
            moonColor={!onTop ? "white" : "black"}
            sunColor={!onTop ? "black" : "white"}
            size={24}
          />
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {LocalStorage.getToken() ? (
            <button
              onClick={() => {
                LocalStorage.removeToken();
                router.push("/login");
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
              className="site-header__btn-avatar"
            >
              <i className="icon-right"></i>
            </button>
          ) : (
            <Link href="/login" legacyBehavior>
              <button className="site-header__btn-avatar">
                <i className="icon-avatar"></i>
              </button>
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
