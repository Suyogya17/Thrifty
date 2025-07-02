
const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Thrifty</h2>
          <p className="text-sm opacity-80">
            Thrifty is your go-to platform for affordable, sustainable fashion. Rent, buy, or donate your clothes with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/rent" className="hover:underline">
                Rent Clothes
              </a>
            </li>
            <li>
              <a href="/donate" className="hover:underline">
                Donate
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm opacity-80">Email: support@thrifty.com</p>
          <p className="text-sm opacity-80">Phone: +1 (555) 123-4567</p>
          <p className="text-sm opacity-80">Address: 123 Fashion St, Style City</p>

          {/* Social Icons (optional) */}
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-pink-400">
             <svg
  className="w-6 h-6 fill-current"
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99h-2.4v-2.88h2.4v-2.2c0-2.38 1.42-3.7 3.58-3.7 1.04 0 2.13.18 2.13.18v2.34h-1.2c-1.18 0-1.55.74-1.55 1.5v1.87h2.64l-.42 2.88h-2.22v6.99A10 10 0 0 0 22 12z" />
</svg>

            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-pink-400">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 2-2.48 9.17 9.17 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.64 4.08 12.72 12.72 0 0 1-9.27-4.7 4.48 4.48 0 0 0 1.39 6 4.4 4.4 0 0 1-2.04-.56v.06a4.48 4.48 0 0 0 3.59 4.4 4.48 4.48 0 0 1-2.02.07 4.48 4.48 0 0 0 4.18 3.12 9 9 0 0 1-5.6 1.92A9.29 9.29 0 0 1 2 19.52a12.72 12.72 0 0 0 6.92 2.02c8.3 0 12.84-6.88 12.84-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-400">
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm5.5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-white opacity-60 mt-8">
        &copy; {new Date().getFullYear()} Thrifty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
