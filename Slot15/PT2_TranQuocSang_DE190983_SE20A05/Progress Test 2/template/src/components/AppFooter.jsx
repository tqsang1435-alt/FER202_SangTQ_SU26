import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị footer với thông tin từ about.js:
  //   - Logo (about.logo) — thêm onError để ẩn ảnh nếu không load được
  //   - Copyright (about.copyright)
  //   - Phiên bản (about.version)
  //   - Môn học (about.course)
  // Dùng <footer> với class "border-top mt-4 py-3 text-center text-muted"
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      <div>
        <img src={about.logo} alt="Logo" height="30" />
      </div>
      <div>{about.copyright}</div>
      <div>Version: {about.version}</div>
      <div>Course: {about.course}</div>
      <div>Year: {about.year}</div>
    </footer>
  )
}
