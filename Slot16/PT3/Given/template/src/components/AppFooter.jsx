import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        {/* TODO-08: Hiển thị logo image, appName, copyright, version, course */}
        <div className="mb-2">
          <img src={about.logo} alt="logo" width="24" height="24" className="me-2" />
          <span className="fw-bold">{about.appName}</span>
        </div>
        <div>
          <span>{about.copyright}</span> | <span>{about.course}</span> | <span>{about.version}</span>
        </div>
      </div>
    </footer>
  )
}
