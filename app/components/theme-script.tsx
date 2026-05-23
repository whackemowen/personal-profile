export default function ThemeScript() {
  const script = `(function(){
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  })()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
