export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__brand">{t.siteName}</p>
        <p>{t.footer.line}</p>
        <p className="footer__note">{t.footer.note}</p>
      </div>
    </footer>
  );
}
